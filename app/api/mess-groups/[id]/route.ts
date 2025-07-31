import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("=== API GET /api/mess-groups/[id] START ===")
    console.log("Mess ID:", params.id)

    // Validate ID parameter
    const messId = Number.parseInt(params.id)
    if (isNaN(messId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid mess group ID",
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Test database connection
    try {
      await sql`SELECT 1 as test`
      console.log("Database connection successful")
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: dbError instanceof Error ? dbError.message : "Unknown database error",
        },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Fetch mess group with owner details
    const result = await sql`
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
        u.email as owner_email,
        u.mobile as owner_mobile
      FROM mess_groups mg
      LEFT JOIN users u ON mg.owner_id = u.id
      WHERE mg.id = ${messId} AND mg.is_active = true
    `

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mess group not found",
        },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const messGroup = result[0]

    // Process amenities field (parse JSON if it's a string)
    const processedMessGroup = {
      ...messGroup,
      amenities: typeof messGroup.amenities === "string" ? JSON.parse(messGroup.amenities) : messGroup.amenities || [],
    }

    console.log("Found mess group:", processedMessGroup.name)

    return NextResponse.json(
      {
        success: true,
        messGroup: processedMessGroup,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("API Error in GET /api/mess-groups/[id]:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch mess group",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("=== API PUT /api/mess-groups/[id] START ===")

    // Check authorization
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "Authorization token required",
        },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const token = authHeader.substring(7)
    const { verifyToken } = await import("@/lib/auth")
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired token",
        },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const messId = Number.parseInt(params.id)
    if (isNaN(messId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid mess group ID",
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
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

    // Verify ownership
    const ownerCheck = await sql`
      SELECT owner_id FROM mess_groups WHERE id = ${messId}
    `

    if (ownerCheck.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mess group not found",
        },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    if (ownerCheck[0].owner_id !== decoded.userId) {
      return NextResponse.json(
        {
          success: false,
          error: "You can only update your own mess groups",
        },
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Update mess group
    const result = await sql`
      UPDATE mess_groups SET
        name = ${name},
        location = ${location.toLowerCase()},
        category = ${category.toLowerCase()},
        description = ${description || ""},
        single_seats = ${single_seats || 0},
        single_price = ${single_price || 0},
        double_seats = ${double_seats || 0},
        double_price = ${double_price || 0},
        amenities = ${JSON.stringify(amenities || [])},
        contact_phone = ${contact_phone || ""},
        contact_email = ${contact_email || ""},
        address = ${address || ""},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${messId}
      RETURNING *
    `

    return NextResponse.json(
      {
        success: true,
        message: "Mess group updated successfully",
        messGroup: result[0],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("API Error in PUT /api/mess-groups/[id]:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update mess group",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("=== API DELETE /api/mess-groups/[id] START ===")

    // Check authorization
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          error: "Authorization token required",
        },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const token = authHeader.substring(7)
    const { verifyToken } = await import("@/lib/auth")
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired token",
        },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    const messId = Number.parseInt(params.id)
    if (isNaN(messId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid mess group ID",
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Verify ownership
    const ownerCheck = await sql`
      SELECT owner_id FROM mess_groups WHERE id = ${messId}
    `

    if (ownerCheck.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mess group not found",
        },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    if (ownerCheck[0].owner_id !== decoded.userId) {
      return NextResponse.json(
        {
          success: false,
          error: "You can only delete your own mess groups",
        },
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Soft delete (set is_active to false)
    await sql`
      UPDATE mess_groups SET
        is_active = false,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${messId}
    `

    return NextResponse.json(
      {
        success: true,
        message: "Mess group deleted successfully",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("API Error in DELETE /api/mess-groups/[id]:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete mess group",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
