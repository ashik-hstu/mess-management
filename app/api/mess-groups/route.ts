import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    console.log("=== API GET /api/mess-groups ===")

    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const category = searchParams.get("category")

    console.log("Query params:", { location, category })

    // Test database connection first
    try {
      await sql`SELECT 1 as test`
      console.log("Database connection successful")
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          messGroups: [],
          count: 0,
        },
        { status: 500 },
      )
    }

    // Build query using tagged template literals
    let result

    if (location && category) {
      console.log("Querying with both location and category")
      result = await sql`
        SELECT 
          mg.id,
          mg.name,
          mg.location,
          mg.category,
          mg.description,
          mg.single_seats,
          mg.single_price,
          mg.double_seats,
          mg.double_price,
          mg.rating,
          mg.amenities,
          mg.contact_phone,
          mg.contact_email,
          mg.address,
          mg.is_active,
          mg.created_at,
          u.name as owner_name,
          u.mobile as owner_mobile,
          u.email as owner_email
        FROM mess_groups mg
        LEFT JOIN users u ON mg.owner_id = u.id
        WHERE mg.is_active = true 
          AND LOWER(mg.location) = LOWER(${location})
          AND LOWER(mg.category) = LOWER(${category})
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
    } else if (location) {
      console.log("Querying with location only")
      result = await sql`
        SELECT 
          mg.id,
          mg.name,
          mg.location,
          mg.category,
          mg.description,
          mg.single_seats,
          mg.single_price,
          mg.double_seats,
          mg.double_price,
          mg.rating,
          mg.amenities,
          mg.contact_phone,
          mg.contact_email,
          mg.address,
          mg.is_active,
          mg.created_at,
          u.name as owner_name,
          u.mobile as owner_mobile,
          u.email as owner_email
        FROM mess_groups mg
        LEFT JOIN users u ON mg.owner_id = u.id
        WHERE mg.is_active = true 
          AND LOWER(mg.location) = LOWER(${location})
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
    } else if (category) {
      console.log("Querying with category only")
      result = await sql`
        SELECT 
          mg.id,
          mg.name,
          mg.location,
          mg.category,
          mg.description,
          mg.single_seats,
          mg.single_price,
          mg.double_seats,
          mg.double_price,
          mg.rating,
          mg.amenities,
          mg.contact_phone,
          mg.contact_email,
          mg.address,
          mg.is_active,
          mg.created_at,
          u.name as owner_name,
          u.mobile as owner_mobile,
          u.email as owner_email
        FROM mess_groups mg
        LEFT JOIN users u ON mg.owner_id = u.id
        WHERE mg.is_active = true 
          AND LOWER(mg.category) = LOWER(${category})
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
    } else {
      console.log("Querying all mess groups")
      result = await sql`
        SELECT 
          mg.id,
          mg.name,
          mg.location,
          mg.category,
          mg.description,
          mg.single_seats,
          mg.single_price,
          mg.double_seats,
          mg.double_price,
          mg.rating,
          mg.amenities,
          mg.contact_phone,
          mg.contact_email,
          mg.address,
          mg.is_active,
          mg.created_at,
          u.name as owner_name,
          u.mobile as owner_mobile,
          u.email as owner_email
        FROM mess_groups mg
        LEFT JOIN users u ON mg.owner_id = u.id
        WHERE mg.is_active = true
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
    }

    console.log("Query executed successfully, found", result.length, "records")
    if (result.length > 0) {
      console.log("First result:", result[0])
    }

    return NextResponse.json({
      success: true,
      messGroups: result,
      count: result.length,
    })
  } catch (error) {
    console.error("API Error in GET /api/mess-groups:", error)

    // Always return JSON, never throw
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch mess groups",
        details: error instanceof Error ? error.message : String(error),
        messGroups: [],
        count: 0,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== API POST /api/mess-groups ===")

    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "Authorization token required",
        },
        { status: 401 },
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired token",
        },
        { status: 401 },
      )
    }

    const body = await request.json()
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
    } = body

    // Validate required fields
    if (!name || !location || !category) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, location, and category are required",
        },
        { status: 400 },
      )
    }

    // Validate category
    if (!["boys", "girls"].includes(category.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category must be either "boys" or "girls"',
        },
        { status: 400 },
      )
    }

    const result = await sql`
      INSERT INTO mess_groups (
        owner_id, name, location, category, description,
        single_seats, single_price, double_seats, double_price,
        amenities, contact_phone, contact_email, address, rating, is_active
      )
      VALUES (
        ${decoded.userId}, ${name}, ${location.toLowerCase()}, ${category.toLowerCase()}, ${description || ""},
        ${single_seats || 0}, ${single_price || 0}, ${double_seats || 0}, ${double_price || 0},
        ${JSON.stringify(amenities || [])}, ${contact_phone || ""}, ${contact_email || ""}, 
        ${address || ""}, ${4.0}, ${true}
      )
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: "Mess group created successfully",
      messGroup: result[0],
    })
  } catch (error) {
    console.error("API Error in POST /api/mess-groups:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create mess group",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
