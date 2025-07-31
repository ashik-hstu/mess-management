-- Insert sample users (mess owners)
INSERT INTO users (name, email, mobile, password_hash, role) VALUES
('Ahmed Hassan', 'ahmed.hassan@email.com', '01712345678', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'owner'),
('Fatima Rahman', 'fatima.rahman@email.com', '01798765432', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'owner'),
('Mohammad Ali', 'mohammad.ali@email.com', '01687654321', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'owner'),
('Rashida Begum', 'rashida.begum@email.com', '01576543210', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'owner'),
('Karim Sheikh', 'karim.sheikh@email.com', '01465432109', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'owner'),
('Nasreen Akter', 'nasreen.akter@email.com', '01354321098', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'owner')
ON CONFLICT (email) DO NOTHING;

-- Insert sample mess groups for Mohabolipur
INSERT INTO mess_groups (owner_id, name, location, category, description, single_seats, single_price, double_seats, double_price, rating, amenities, contact_phone, contact_email, address) VALUES
(1, 'Green Valley Boys Mess', 'mohabolipur', 'boys', 'A comfortable and affordable mess for male students with home-cooked meals and modern amenities.', 15, 1800, 10, 1400, 4.5, '["WiFi", "AC", "Study Room", "24/7 Security", "Laundry"]', '01712345678', 'greenvalley@email.com', 'House #45, Road #3, Mohabolipur, Dinajpur'),
(2, 'Rose Garden Girls Mess', 'mohabolipur', 'girls', 'Safe and secure accommodation for female students with nutritious meals and friendly environment.', 12, 1900, 8, 1500, 4.7, '["WiFi", "AC", "Common Room", "24/7 Security", "Garden"]', '01798765432', 'rosegarden@email.com', 'House #67, Road #5, Mohabolipur, Dinajpur'),
(3, 'Sunrise Boys Hostel', 'mohabolipur', 'boys', 'Modern hostel facility with excellent food quality and study-friendly environment for male students.', 20, 1700, 15, 1300, 4.3, '["WiFi", "Generator", "Study Room", "Parking", "Common Room"]', '01687654321', 'sunrise@email.com', 'House #89, Road #7, Mohabolipur, Dinajpur'),
(4, 'Moonlight Girls Hostel', 'mohabolipur', 'girls', 'Premium accommodation for female students with top-notch security and quality meals.', 18, 2000, 12, 1600, 4.6, '["WiFi", "AC", "Study Room", "24/7 Security", "Laundry", "Garden"]', '01576543210', 'moonlight@email.com', 'House #12, Road #2, Mohabolipur, Dinajpur');

-- Insert sample mess groups for BCS Gali
INSERT INTO mess_groups (owner_id, name, location, category, description, single_seats, single_price, double_seats, double_price, rating, amenities, contact_phone, contact_email, address) VALUES
(5, 'Scholar Point Boys Mess', 'bcs-gali', 'boys', 'Ideal location for male students preparing for competitive exams with quiet study environment.', 25, 1600, 20, 1200, 4.4, '["WiFi", "Study Room", "Generator", "24/7 Security", "Common Room"]', '01465432109', 'scholarpoint@email.com', 'House #34, BCS Gali, Dinajpur'),
(6, 'Lily House Girls Mess', 'bcs-gali', 'girls', 'Cozy and secure mess for female students with homely atmosphere and nutritious food.', 16, 1750, 12, 1350, 4.5, '["WiFi", "AC", "24/7 Security", "Laundry", "Common Room"]', '01354321098', 'lilyhouse@email.com', 'House #56, BCS Gali, Dinajpur'),
(1, 'Victory Boys Hostel', 'bcs-gali', 'boys', 'Well-maintained hostel with modern facilities and excellent food quality for male students.', 22, 1650, 18, 1250, 4.2, '["WiFi", "Generator", "Parking", "Study Room", "24/7 Security"]', '01712345678', 'victory@email.com', 'House #78, BCS Gali, Dinajpur'),
(2, 'Orchid Girls Residence', 'bcs-gali', 'girls', 'Premium residence for female students with all modern amenities and 24/7 security.', 14, 1850, 10, 1450, 4.8, '["WiFi", "AC", "Study Room", "24/7 Security", "Garden", "Laundry"]', '01798765432', 'orchid@email.com', 'House #90, BCS Gali, Dinajpur');

-- Insert sample mess groups for Kornai
INSERT INTO mess_groups (owner_id, name, location, category, description, single_seats, single_price, double_seats, double_price, rating, amenities, contact_phone, contact_email, address) VALUES
(3, 'Peaceful Boys Mess', 'kornai', 'boys', 'Quiet and peaceful environment perfect for male students who prefer a calm study atmosphere.', 18, 1550, 14, 1150, 4.3, '["WiFi", "Study Room", "Generator", "Common Room", "Parking"]', '01687654321', 'peaceful@email.com', 'House #23, Kornai, Dinajpur'),
(4, 'Jasmine Girls Mess', 'kornai', 'girls', 'Beautiful and secure mess for female students with garden view and quality meals.', 20, 1700, 16, 1300, 4.6, '["WiFi", "24/7 Security", "Garden", "Laundry", "Common Room"]', '01576543210', 'jasmine@email.com', 'House #45, Kornai, Dinajpur'),
(5, 'Golden Boys Hostel', 'kornai', 'boys', 'Affordable and comfortable hostel for male students with good food and friendly staff.', 24, 1500, 20, 1100, 4.1, '["WiFi", "Generator", "Study Room", "24/7 Security", "Parking"]', '01465432109', 'golden@email.com', 'House #67, Kornai, Dinajpur'),
(6, 'Tulip Girls Residence', 'kornai', 'girls', 'Modern residence for female students with all necessary facilities and homely environment.', 16, 1800, 12, 1400, 4.7, '["WiFi", "AC", "Study Room", "24/7 Security", "Laundry", "Garden"]', '01354321098', 'tulip@email.com', 'House #89, Kornai, Dinajpur');
