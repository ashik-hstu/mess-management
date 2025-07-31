-- Insert sample users (mess owners)
INSERT INTO users (name, email, mobile, password_hash, role) VALUES
('Ahmed Hassan', 'ahmed.hassan@email.com', '01712345678', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'owner'),
('Fatima Rahman', 'fatima.rahman@email.com', '01723456789', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'owner'),
('Mohammad Ali', 'mohammad.ali@email.com', '01734567890', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'owner'),
('Rashida Begum', 'rashida.begum@email.com', '01745678901', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'owner'),
('Karim Sheikh', 'karim.sheikh@email.com', '01756789012', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'owner'),
('Nasreen Khan', 'nasreen.khan@email.com', '01767890123', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'owner');

-- Insert sample mess groups for Mohabolipur
INSERT INTO mess_groups (
    owner_id, name, location, category, description,
    single_seats, single_price, double_seats, double_price,
    rating, amenities, contact_phone, contact_email, address
) VALUES
-- Mohabolipur Boys Mess Groups
(1, 'Green Valley Boys Mess', 'mohabolipur', 'boys', 'A comfortable and affordable mess for male students with excellent food quality and modern facilities.', 
 15, 1800, 10, 1400, 4.5, 
 '["WiFi", "24/7 Security", "Generator", "Study Room", "Common Room"]',
 '01712345678', 'greenvalley@email.com', 'House #45, Road #3, Mohabolipur, Dinajpur'),

(3, 'Royal Boys Hostel', 'mohabolipur', 'boys', 'Premium accommodation for boys with AC rooms, quality meals, and excellent study environment.',
 20, 2200, 15, 1800, 4.7,
 '["WiFi", "AC", "Generator", "Parking", "Laundry", "Study Room"]',
 '01734567890', 'royalboys@email.com', 'House #78, Road #5, Mohabolipur, Dinajpur'),

-- Mohabolipur Girls Mess Groups  
(2, 'Rose Garden Girls Mess', 'mohabolipur', 'girls', 'Safe and secure accommodation for female students with homely environment and nutritious meals.',
 12, 1900, 8, 1500, 4.6,
 '["WiFi", "24/7 Security", "Generator", "Garden", "Common Room"]',
 '01723456789', 'rosegarden@email.com', 'House #23, Road #2, Mohabolipur, Dinajpur'),

(4, 'Lily House Girls Mess', 'mohabolipur', 'girls', 'Modern facilities for girls with emphasis on safety, cleanliness, and quality food.',
 18, 2000, 12, 1600, 4.4,
 '["WiFi", "24/7 Security", "AC", "Laundry", "Study Room"]',
 '01745678901', 'lilyhouse@email.com', 'House #67, Road #4, Mohabolipur, Dinajpur'),

-- BCS Gali Boys Mess Groups
(5, 'Scholar Boys Mess', 'bcs-gali', 'boys', 'Ideal for serious students with quiet study environment and healthy meals.',
 25, 1700, 20, 1300, 4.3,
 '["WiFi", "Generator", "Study Room", "Library", "Common Room"]',
 '01756789012', 'scholarboys@email.com', 'House #12, BCS Gali, Dinajpur'),

(1, 'Unity Boys Hostel', 'bcs-gali', 'boys', 'Affordable accommodation with good facilities and friendly environment for male students.',
 30, 1600, 25, 1200, 4.2,
 '["WiFi", "24/7 Security", "Generator", "Parking", "Common Room"]',
 '01712345678', 'unityboys@email.com', 'House #34, BCS Gali, Dinajpur'),

-- BCS Gali Girls Mess Groups
(6, 'Sunflower Girls Mess', 'bcs-gali', 'girls', 'Comfortable and secure living space for female students with modern amenities.',
 16, 1850, 12, 1450, 4.5,
 '["WiFi", "24/7 Security", "Generator", "Garden", "Study Room"]',
 '01767890123', 'sunflower@email.com', 'House #56, BCS Gali, Dinajpur'),

(2, 'Jasmine House', 'bcs-gali', 'girls', 'Premium girls mess with excellent food quality and safe environment.',
 14, 1950, 10, 1550, 4.6,
 '["WiFi", "24/7 Security", "AC", "Laundry", "Common Room"]',
 '01723456789', 'jasminehouse@email.com', 'House #78, BCS Gali, Dinajpur'),

-- Kornai Boys Mess Groups
(3, 'Peaceful Boys Mess', 'kornai', 'boys', 'Quiet and peaceful environment perfect for focused studies with quality accommodation.',
 20, 1650, 15, 1250, 4.4,
 '["WiFi", "Generator", "Study Room", "Garden", "Common Room"]',
 '01734567890', 'peacefulboys@email.com', 'House #89, Kornai, Dinajpur'),

(5, 'Harmony Boys Hostel', 'kornai', 'boys', 'Well-maintained hostel with good food and friendly atmosphere for male students.',
 22, 1750, 18, 1350, 4.3,
 '["WiFi", "24/7 Security", "Generator", "Parking", "Study Room"]',
 '01756789012', 'harmonyboys@email.com', 'House #45, Kornai, Dinajpur'),

-- Kornai Girls Mess Groups
(4, 'Orchid Girls Mess', 'kornai', 'girls', 'Beautiful and safe accommodation for girls with homely atmosphere and quality meals.',
 15, 1800, 10, 1400, 4.7,
 '["WiFi", "24/7 Security", "Generator", "Garden", "Study Room"]',
 '01745678901', 'orchidgirls@email.com', 'House #67, Kornai, Dinajpur'),

(6, 'Tulip House Girls', 'kornai', 'girls', 'Modern facilities with emphasis on safety and comfort for female students.',
 18, 1900, 14, 1500, 4.5,
 '["WiFi", "24/7 Security", "AC", "Laundry", "Common Room", "Garden"]',
 '01767890123', 'tuliphouse@email.com', 'House #23, Kornai, Dinajpur');
