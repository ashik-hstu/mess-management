-- Insert sample users (mess owners)
INSERT INTO users (name, email, mobile, location, role, password_hash) VALUES
('Ahmed Hassan', 'ahmed@example.com', '01712345678', 'mohabolipur', 'owner', '$2b$10$example_hash_1'),
('Fatima Khan', 'fatima@example.com', '01812345679', 'mohabolipur', 'owner', '$2b$10$example_hash_2'),
('Mohammad Ali', 'ali@example.com', '01912345680', 'bcs-gali', 'owner', '$2b$10$example_hash_3'),
('Rashida Begum', 'rashida@example.com', '01612345681', 'bcs-gali', 'owner', '$2b$10$example_hash_4'),
('Karim Rahman', 'karim@example.com', '01512345682', 'kornai', 'owner', '$2b$10$example_hash_5'),
('Nasreen Akter', 'nasreen@example.com', '01412345683', 'kornai', 'owner', '$2b$10$example_hash_6');

-- Insert sample mess groups
INSERT INTO mess_groups (
  owner_id, name, location, category, description,
  single_seats, single_price, double_seats, double_price,
  rating, amenities, contact_phone, contact_email, address
) VALUES
-- Mohabolipur Boys Messes
(1, 'Priom Mess', 'mohabolipur', 'boys', 'Premium mess with excellent facilities and hygienic food preparation', 
 20, 1500, 15, 1200, 4.5, 
 '["Wi-Fi", "AC", "Laundry", "24/7 Security", "Study Room"]',
 '01712345678', 'priom@example.com', 'House 15, Road 3, Mohabolipur'),

(1, 'Golden Mess', 'mohabolipur', 'boys', 'Affordable mess with good quality food and comfortable living', 
 25, 1300, 20, 1000, 4.2, 
 '["Wi-Fi", "Generator", "Common Room", "Security"]',
 '01712345678', 'golden@example.com', 'House 22, Road 5, Mohabolipur'),

-- Mohabolipur Girls Messes
(2, 'Rose Garden Mess', 'mohabolipur', 'girls', 'Safe and secure mess for female students with homely environment', 
 18, 1600, 12, 1300, 4.7, 
 '["Wi-Fi", "AC", "24/7 Security", "CCTV", "Study Room", "Common Kitchen"]',
 '01812345679', 'rosegarden@example.com', 'House 8, Road 2, Mohabolipur'),

(2, 'Lily Mess', 'mohabolipur', 'girls', 'Comfortable accommodation with nutritious meals and friendly environment', 
 22, 1400, 18, 1100, 4.3, 
 '["Wi-Fi", "Generator", "Security", "Common Room"]',
 '01812345679', 'lily@example.com', 'House 12, Road 4, Mohabolipur'),

-- BCS Gali Boys Messes
(3, 'Campus View Mess', 'bcs-gali', 'boys', 'Close to campus with modern facilities and quality food service', 
 30, 1400, 25, 1150, 4.4, 
 '["Wi-Fi", "AC", "Gym", "Study Room", "Security"]',
 '01912345680', 'campusview@example.com', 'House 5, BCS Gali'),

(3, 'Student Paradise', 'bcs-gali', 'boys', 'Budget-friendly mess with all basic amenities and good food', 
 35, 1200, 30, 950, 4.0, 
 '["Wi-Fi", "Generator", "Common Room", "Security"]',
 '01912345680', 'paradise@example.com', 'House 18, BCS Gali'),

-- BCS Gali Girls Messes
(4, 'Sunflower Mess', 'bcs-gali', 'girls', 'Premium accommodation for female students with top-notch security', 
 16, 1700, 10, 1400, 4.6, 
 '["Wi-Fi", "AC", "24/7 Security", "CCTV", "Study Room", "Gym"]',
 '01612345681', 'sunflower@example.com', 'House 7, BCS Gali'),

(4, 'Orchid Mess', 'bcs-gali', 'girls', 'Cozy mess with homely atmosphere and nutritious meals', 
 20, 1500, 15, 1200, 4.4, 
 '["Wi-Fi", "Generator", "Security", "Common Kitchen"]',
 '01612345681', 'orchid@example.com', 'House 14, BCS Gali'),

-- Kornai Boys Messes
(5, 'Green Valley Mess', 'kornai', 'boys', 'Peaceful location with modern amenities and quality service', 
 28, 1350, 22, 1100, 4.3, 
 '["Wi-Fi", "AC", "Study Room", "Security", "Garden"]',
 '01512345682', 'greenvalley@example.com', 'House 10, Kornai'),

(5, 'Hill View Mess', 'kornai', 'boys', 'Scenic location with comfortable living and good food quality', 
 24, 1250, 18, 1000, 4.1, 
 '["Wi-Fi", "Generator", "Common Room", "Security"]',
 '01512345682', 'hillview@example.com', 'House 25, Kornai'),

-- Kornai Girls Messes
(6, 'Jasmine Mess', 'kornai', 'girls', 'Secure and comfortable mess with excellent facilities for female students', 
 15, 1650, 10, 1350, 4.8, 
 '["Wi-Fi", "AC", "24/7 Security", "CCTV", "Study Room", "Library"]',
 '01412345683', 'jasmine@example.com', 'House 3, Kornai'),

(6, 'Tulip Garden', 'kornai', 'girls', 'Beautiful mess with garden view and homely environment', 
 18, 1450, 14, 1150, 4.5, 
 '["Wi-Fi", "Generator", "Security", "Garden", "Common Room"]',
 '01412345683', 'tulipgarden@example.com', 'House 20, Kornai');
