import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, mobile, password, location } = await request.json()

    // Validate required fields
    if (!name || !email || !mobile || !password || !location) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email} OR mobile = ${mobile}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User with this email or mobile already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const newUser = await sql`
      INSERT INTO users (name, email, mobile, password, location, role)
      VALUES (${name}, ${email}, ${mobile}, ${hashedPassword}, ${location}, 'owner')
      RETURNING id, name, email, mobile, location, role, created_at
    `

    const user = newUser[0]
    const token = generateToken(user)

    return NextResponse.json({
      message: "User registered successfully",
      user,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
