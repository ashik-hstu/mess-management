import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("=== API GET /api/mess-groups/[id] ===")

    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid mess group ID",
        },
        { status: 400 },
      )
    }

    console.log("Fetching mess group with ID:", id)

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
        u.mobile as owner_mobile,
        u.email as owner_email
      FROM mess_groups mg
      LEFT JOIN users u ON mg.owner_id = u.id
      WHERE mg.id = ${id} AND mg.is_active = true
    `

    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mess group not found",
        },
        { status: 404 },
      )
    }

    console.log("Found mess group:", result[0])

    return NextResponse.json({
      success: true,
      messGroup: result[0],
    })
  } catch (error) {
    console.error("API Error in GET /api/mess-groups/[id]:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch mess group",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
