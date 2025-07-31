-- Drop existing tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS mess_groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20),
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'owner',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create mess_groups table
CREATE TABLE mess_groups (
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

-- Create indexes for better performance
CREATE INDEX idx_mess_groups_location ON mess_groups(location);
CREATE INDEX idx_mess_groups_category ON mess_groups(category);
CREATE INDEX idx_mess_groups_active ON mess_groups(is_active);
CREATE INDEX idx_mess_groups_rating ON mess_groups(rating DESC);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);

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
