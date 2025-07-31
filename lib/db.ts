import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`
    console.log("Database connected successfully:", result[0])
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

// Helper function to get mess groups by location and category
export async function getMessGroups(location?: string, category?: string) {
  try {
    let query = "SELECT * FROM mess_groups WHERE is_active = true"
    const params: any[] = []
    let paramIndex = 1

    if (location) {
      query += ` AND location = $${paramIndex}`
      params.push(location)
      paramIndex++
    }

    if (category) {
      query += ` AND category = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    query += " ORDER BY rating DESC, created_at DESC"

    const result = await sql(query, params)
    return result
  } catch (error) {
    console.error("Error fetching mess groups:", error)
    throw error
  }
}

// Helper function to get a single mess group by ID
export async function getMessGroupById(id: string) {
  try {
    const result = await sql`
      SELECT mg.*, u.name as owner_name, u.email as owner_email, u.mobile as owner_mobile
      FROM mess_groups mg
      LEFT JOIN users u ON mg.owner_id = u.id
      WHERE mg.id = ${id} AND mg.is_active = true
    `
    return result[0] || null
  } catch (error) {
    console.error("Error fetching mess group by ID:", error)
    throw error
  }
}

// Helper function to create a new mess group
export async function createMessGroup(data: any) {
  try {
    const result = await sql`
      INSERT INTO mess_groups (
        owner_id, name, location, category, description,
        single_seats, single_price, double_seats, double_price,
        amenities, contact_phone, contact_email, address
      ) VALUES (
        ${data.owner_id}, ${data.name}, ${data.location}, ${data.category}, ${data.description},
        ${data.single_seats || 0}, ${data.single_price || 0}, ${data.double_seats || 0}, ${data.double_price || 0},
        ${JSON.stringify(data.amenities || [])}, ${data.contact_phone}, ${data.contact_email}, ${data.address}
      ) RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating mess group:", error)
    throw error
  }
}
