import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== API POST /api/auth/register ===")

    const body = await request.json()
    const { name, email, mobile, password } = body

    console.log("Registration attempt for:", { name, email, mobile })

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and password are required",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 409 },
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const result = await sql`
      INSERT INTO users (name, email, mobile, password_hash, role)
      VALUES (${name}, ${email}, ${mobile || ""}, ${passwordHash}, 'owner')
      RETURNING id, name, email, mobile, role, created_at
    `

    const user = result[0]
    console.log("User created successfully:", user)

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("API Error in POST /api/auth/register:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to register user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
