import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { mobile, password } = await request.json()

    // Validate required fields
    if (!mobile || !password) {
      return NextResponse.json({ error: "Mobile and password are required" }, { status: 400 })
    }

    // Find user by mobile
    const users = await sql`
      SELECT id, name, email, mobile, password, location, role, created_at
      FROM users 
      WHERE mobile = ${mobile}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    const token = generateToken(userWithoutPassword)

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
