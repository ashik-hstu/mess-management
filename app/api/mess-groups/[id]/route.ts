import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const messGroup = await sql`
      SELECT mg.*, u.name as owner_name, u.mobile as owner_mobile, u.email as owner_email
      FROM mess_groups mg
      LEFT JOIN users u ON mg.owner_id = u.id
      WHERE mg.id = ${params.id} AND mg.is_active = true
    `

    if (messGroup.length === 0) {
      return NextResponse.json({ error: "Mess group not found" }, { status: 404 })
    }

    return NextResponse.json({ messGroup: messGroup[0] })
  } catch (error) {
    console.error("Error fetching mess group:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const updateData = await request.json()

    // Update mess group
    const updatedMessGroup = await sql`
      UPDATE mess_groups 
      SET 
        name = ${updateData.name},
        location = ${updateData.location},
        category = ${updateData.category},
        description = ${updateData.description},
        single_seats = ${updateData.single_seats || 0},
        single_price = ${updateData.single_price || 0},
        double_seats = ${updateData.double_seats || 0},
        double_price = ${updateData.double_price || 0},
        amenities = ${updateData.amenities || []},
        contact_phone = ${updateData.contact_phone || ""},
        contact_email = ${updateData.contact_email || ""},
        address = ${updateData.address || ""},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id} AND owner_id = ${decoded.id}
      RETURNING *
    `

    if (updatedMessGroup.length === 0) {
      return NextResponse.json({ error: "Mess group not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Mess group updated successfully",
      messGroup: updatedMessGroup[0],
    })
  } catch (error) {
    console.error("Error updating mess group:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
