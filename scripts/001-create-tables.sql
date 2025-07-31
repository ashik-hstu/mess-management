-- Create users table for authentication
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

-- Create mess_groups table for storing mess information
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
    rating DECIMAL(3,2) DEFAULT 0,
    amenities TEXT[], -- Array of amenities
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mess_groups_location ON mess_groups(location);
CREATE INDEX IF NOT EXISTS idx_mess_groups_category ON mess_groups(category);
CREATE INDEX IF NOT EXISTS idx_mess_groups_active ON mess_groups(is_active);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
