import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const category = searchParams.get("category")

    let query = `
      SELECT mg.*, u.name as owner_name, u.mobile as owner_mobile
      FROM mess_groups mg
      LEFT JOIN users u ON mg.owner_id = u.id
      WHERE mg.is_active = true
    `
    const params: any[] = []

    if (location) {
      query += ` AND mg.location = $${params.length + 1}`
      params.push(location)
    }

    if (category) {
      query += ` AND mg.category = $${params.length + 1}`
      params.push(category)
    }

    query += ` ORDER BY mg.rating DESC, mg.created_at DESC`

    const messGroups = await sql(query, params)

    return NextResponse.json({ messGroups })
  } catch (error) {
    console.error("Error fetching mess groups:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
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
    if (!name || !location || !category || !description) {
      return NextResponse.json({ error: "Name, location, category, and description are required" }, { status: 400 })
    }

    // Create mess group
    const newMessGroup = await sql`
      INSERT INTO mess_groups (
        name, location, category, description, single_seats, single_price,
        double_seats, double_price, amenities, contact_phone, contact_email,
        address, owner_id
      )
      VALUES (
        ${name}, ${location}, ${category}, ${description}, ${single_seats || 0},
        ${single_price || 0}, ${double_seats || 0}, ${double_price || 0},
        ${amenities || []}, ${contact_phone || ""}, ${contact_email || ""},
        ${address || ""}, ${decoded.id}
      )
      RETURNING *
    `

    return NextResponse.json({
      message: "Mess group created successfully",
      messGroup: newMessGroup[0],
    })
  } catch (error) {
    console.error("Error creating mess group:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
