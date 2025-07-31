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
    if (location && category) {
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
        WHERE mg.is_active = true 
          AND LOWER(mg.location) = LOWER(${location})
          AND LOWER(mg.category) = LOWER(${category})
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
      return result
    } else if (location) {
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
        WHERE mg.is_active = true 
          AND LOWER(mg.location) = LOWER(${location})
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
      return result
    } else if (category) {
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
        WHERE mg.is_active = true 
          AND LOWER(mg.category) = LOWER(${category})
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
      return result
    } else {
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
        WHERE mg.is_active = true
        ORDER BY mg.rating DESC, mg.created_at DESC
      `
      return result
    }
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
