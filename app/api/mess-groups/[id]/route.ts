import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid mess group ID" }, { status: 400 })
    }

    const result = await sql`
      SELECT 
        mg.*,
        u.name as owner_name,
        u.mobile as owner_mobile,
        u.email as owner_email
      FROM mess_groups mg
      LEFT JOIN users u ON mg.owner_id = u.id
      WHERE mg.id = ${id} AND mg.is_active = true
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Mess group not found" }, { status: 404 })
    }

    return NextResponse.json({
      messGroup: result[0],
    })
  } catch (error) {
    console.error("Error fetching mess group:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
