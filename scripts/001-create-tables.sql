-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'owner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create mess_groups table
CREATE TABLE IF NOT EXISTS mess_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'boys' or 'girls'
    description TEXT,
    single_seats INTEGER DEFAULT 0,
    single_price INTEGER DEFAULT 0,
    double_seats INTEGER DEFAULT 0,
    double_price INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    amenities TEXT[], -- Array of amenities
    contact_phone VARCHAR(15),
    contact_email VARCHAR(255),
    address TEXT,
    owner_id INTEGER REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_mess_groups_location ON mess_groups(location);
CREATE INDEX IF NOT EXISTS idx_mess_groups_category ON mess_groups(category);
CREATE INDEX IF NOT EXISTS idx_mess_groups_owner ON mess_groups(owner_id);
