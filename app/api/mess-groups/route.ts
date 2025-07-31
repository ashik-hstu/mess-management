import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const category = searchParams.get("category")

    console.log("Fetching mess groups with params:", { location, category })

    let query = `
      SELECT 
        mg.*,
        u.name as owner_name,
        u.mobile as owner_mobile,
        u.email as owner_email
      FROM mess_groups mg
      LEFT JOIN users u ON mg.owner_id = u.id
      WHERE mg.is_active = true
    `

    const params: any[] = []

    if (location) {
      query += ` AND LOWER(mg.location) = LOWER($${params.length + 1})`
      params.push(location)
    }

    if (category) {
      query += ` AND LOWER(mg.category) = LOWER($${params.length + 1})`
      params.push(category)
    }

    query += ` ORDER BY mg.rating DESC, mg.created_at DESC`

    console.log("Executing query:", query, "with params:", params)

    const result = await sql.unsafe(query, params)

    console.log("Query result:", result)

    return NextResponse.json({
      messGroups: result,
      count: result.length,
    })
  } catch (error) {
    console.error("Error fetching mess groups:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const {
      name,
      location,
      category,
      description,
      single_seats,
      single_price,
      double_seats,
      double_price,
      amenities,
      contact_phone,
      contact_email,
      address,
    } = await request.json()

    // Validate required fields
    if (!name || !location || !category) {
      return NextResponse.json({ error: "Name, location, and category are required" }, { status: 400 })
    }

    // Validate category
    if (!["boys", "girls"].includes(category.toLowerCase())) {
      return NextResponse.json({ error: 'Category must be either "boys" or "girls"' }, { status: 400 })
    }

    // Normalize location and category to lowercase for consistency
    const normalizedLocation = location.toLowerCase()
    const normalizedCategory = category.toLowerCase()

    const result = await sql`
      INSERT INTO mess_groups (
        owner_id, name, location, category, description,
        single_seats, single_price, double_seats, double_price,
        amenities, contact_phone, contact_email, address
      )
      VALUES (
        ${decoded.userId}, ${name}, ${normalizedLocation}, ${normalizedCategory}, ${description || null},
        ${single_seats || 0}, ${single_price || 0}, ${double_seats || 0}, ${double_price || 0},
        ${amenities || []}, ${contact_phone || null}, ${contact_email || null}, ${address || null}
      )
      RETURNING *
    `

    return NextResponse.json({
      message: "Mess group created successfully",
      messGroup: result[0],
    })
  } catch (error) {
    console.error("Error creating mess group:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
