-- Drop existing tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS mess_groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

-- Create users table for mess owners
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'owner',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create mess_groups table
CREATE TABLE IF NOT EXISTS mess_groups (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('boys', 'girls')),
    description TEXT,
    single_seats INTEGER DEFAULT 0,
    single_price DECIMAL(10,2) DEFAULT 0,
    double_seats INTEGER DEFAULT 0,
    double_price DECIMAL(10,2) DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 4.0,
    amenities JSONB DEFAULT '[]',
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table for future use
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    mess_group_id INTEGER REFERENCES mess_groups(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_phone VARCHAR(20),
    seat_type VARCHAR(50) NOT NULL CHECK (seat_type IN ('single', 'double')),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mess_groups_location ON mess_groups(location);
CREATE INDEX IF NOT EXISTS idx_mess_groups_category ON mess_groups(category);
CREATE INDEX IF NOT EXISTS idx_mess_groups_active ON mess_groups(is_active);
CREATE INDEX IF NOT EXISTS idx_mess_groups_location_category ON mess_groups(location, category);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_mess_group ON bookings(mess_group_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mess_groups_updated_at BEFORE UPDATE ON mess_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
