-- Insert sample admin user (password: admin123)
INSERT INTO users (name, email, mobile, password, location, role) VALUES 
('Admin User', 'admin@hstu.ac.bd', '01700000000', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'mohabolipur', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample mess groups
INSERT INTO mess_groups (name, location, category, description, single_seats, single_price, double_seats, double_price, rating, amenities, contact_phone, contact_email, address, owner_id) VALUES 
(
    'Royal Palace Mess',
    'mohabalipur',
    'boys',
    'Premium mess facility with modern amenities, 24/7 security, and excellent food quality. Located in the heart of Mohabalipur with easy access to campus.',
    12,
    1500,
    6,
    1000,
    4.8,
    ARRAY['WiFi', '24/7 Security', 'Laundry', 'Study Room', 'Common Room', 'Parking'],
    '01711111111',
    'royal@mess.com',
    'House #123, Road #5, Mohabalipur, Dinajpur',
    1
),
(
    'Golden Crown Mess',
    'mohabalipur',
    'girls',
    'Safe and secure accommodation for female students with female caretaker, CCTV surveillance, and nutritious meals prepared by experienced cooks.',
    8,
    1200,
    4,
    1000,
    4.6,
    ARRAY['Female Caretaker', 'CCTV', 'WiFi', 'Laundry', 'Common Kitchen', 'Study Area'],
    '01722222222',
    'golden@mess.com',
    'House #456, Road #3, Mohabalipur, Dinajpur',
    1
),
(
    'Silver Star Mess',
    'bcs-gali',
    'boys',
    'Affordable and comfortable mess with home-like environment. Close to BCS coaching centers and university campus.',
    10,
    1600,
    5,
    1200,
    4.7,
    ARRAY['WiFi', 'Common Room', 'Parking', 'Laundry', 'Generator'],
    '01733333333',
    'silver@mess.com',
    'House #789, BCS Gali, Dinajpur',
    1
),
(
    'Diamond Heights Mess',
    'kornai',
    'girls',
    'Modern mess facility with all amenities in peaceful Kornai area. Perfect for students who prefer quiet study environment.',
    15,
    1500,
    8,
    1000,
    4.9,
    ARRAY['Female Security', 'WiFi', 'Study Room', 'Common Kitchen', 'Laundry', 'Garden'],
    '01744444444',
    'diamond@mess.com',
    'House #321, Kornai, Dinajpur',
    1
);
