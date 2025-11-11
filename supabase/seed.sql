-- Sample data for UIT University Database
-- Run this after creating the schema to populate with sample data

-- Insert sample instructors
INSERT INTO instructors (full_name, email, phone, bio, specialization, years_experience) VALUES
('Dr. Ahmed Hassan', 'ahmed.hassan@uitu.edu.pk', '+92-300-1234567', 'Expert in Computer Science with 15 years of teaching experience', 'Computer Science & AI', 15),
('Dr. Sarah Khan', 'sarah.khan@uitu.edu.pk', '+92-300-2345678', 'Electrical Engineering specialist with focus on renewable energy', 'Electrical Engineering', 12),
('Prof. Muhammad Ali', 'muhammad.ali@uitu.edu.pk', '+92-300-3456789', 'Business Administration expert with industry experience', 'Business Management', 18),
('Dr. Fatima Sheikh', 'fatima.sheikh@uitu.edu.pk', '+92-300-4567890', 'Software Engineering and Project Management specialist', 'Software Engineering', 10),
('Dr. Usman Malik', 'usman.malik@uitu.edu.pk', '+92-300-5678901', 'Data Science and Machine Learning researcher', 'Data Science', 8);

-- Insert sample courses
INSERT INTO courses (title, description, duration, level, price, category, instructor_id, max_students, start_date, end_date) VALUES
('BS Computer Science', 'Comprehensive computer science program covering programming, algorithms, data structures, and software development.', '4 Years', 'bachelor', 150000.00, 'computer-science', (SELECT id FROM instructors WHERE email = 'ahmed.hassan@uitu.edu.pk'), 50, '2024-09-01', '2028-06-30'),
('BS Software Engineering', 'Focus on software development lifecycle, project management, and modern software engineering practices.', '4 Years', 'bachelor', 150000.00, 'computer-science', (SELECT id FROM instructors WHERE email = 'fatima.sheikh@uitu.edu.pk'), 40, '2024-09-01', '2028-06-30'),
('BS Artificial Intelligence', 'Cutting-edge AI program covering machine learning, neural networks, and intelligent systems.', '4 Years', 'bachelor', 160000.00, 'computer-science', (SELECT id FROM instructors WHERE email = 'usman.malik@uitu.edu.pk'), 30, '2024-09-01', '2028-06-30'),
('BE Electrical Engineering', 'Comprehensive electrical engineering program with focus on power systems and electronics.', '4 Years', 'bachelor', 140000.00, 'engineering', (SELECT id FROM instructors WHERE email = 'sarah.khan@uitu.edu.pk'), 45, '2024-09-01', '2028-06-30'),
('BBA Business Administration', 'Business administration program covering management principles, marketing, and entrepreneurship.', '4 Years', 'bachelor', 120000.00, 'business', (SELECT id FROM instructors WHERE email = 'muhammad.ali@uitu.edu.pk'), 60, '2024-09-01', '2028-06-30'),
('MS Computer Science', 'Advanced computer science program for graduate students with research opportunities.', '2 Years', 'master', 200000.00, 'computer-science', (SELECT id FROM instructors WHERE email = 'ahmed.hassan@uitu.edu.pk'), 25, '2024-09-01', '2026-06-30'),
('Python Programming Bootcamp', 'Intensive Python programming course for beginners and intermediate learners.', '3 Months', 'beginner', 25000.00, 'programming', (SELECT id FROM instructors WHERE email = 'fatima.sheikh@uitu.edu.pk'), 30, '2024-11-01', '2025-01-31'),
('Digital Marketing Certification', 'Comprehensive digital marketing course covering SEO, social media, and online advertising.', '2 Months', 'intermediate', 20000.00, 'marketing', (SELECT id FROM instructors WHERE email = 'muhammad.ali@uitu.edu.pk'), 40, '2024-11-15', '2025-01-15'),
('Data Science with Machine Learning', 'Advanced course covering data analysis, machine learning algorithms, and practical applications.', '6 Months', 'advanced', 75000.00, 'data-science', (SELECT id FROM instructors WHERE email = 'usman.malik@uitu.edu.pk'), 20, '2024-12-01', '2025-05-31'),
('Web Development Full Stack', 'Complete web development course covering frontend and backend technologies.', '4 Months', 'intermediate', 45000.00, 'programming', (SELECT id FROM instructors WHERE email = 'fatima.sheikh@uitu.edu.pk'), 35, '2024-11-01', '2025-02-28');

-- Insert sample students
INSERT INTO students (email, full_name, phone, date_of_birth, address) VALUES
('student1@example.com', 'Ali Ahmad', '+92-300-1111111', '2002-05-15', 'Karachi, Pakistan'),
('student2@example.com', 'Ayesha Khan', '+92-300-2222222', '2001-08-22', 'Lahore, Pakistan'),
('student3@example.com', 'Hassan Ali', '+92-300-3333333', '2003-01-10', 'Islamabad, Pakistan'),
('student4@example.com', 'Fatima Malik', '+92-300-4444444', '2002-11-05', 'Karachi, Pakistan'),
('student5@example.com', 'Omar Sheikh', '+92-300-5555555', '2001-03-18', 'Rawalpindi, Pakistan');

-- Insert sample enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date, status, payment_status) VALUES
((SELECT id FROM students WHERE email = 'student1@example.com'), (SELECT id FROM courses WHERE title = 'BS Computer Science'), '2024-08-15', 'approved', 'paid'),
((SELECT id FROM students WHERE email = 'student2@example.com'), (SELECT id FROM courses WHERE title = 'BS Software Engineering'), '2024-08-20', 'approved', 'paid'),
((SELECT id FROM students WHERE email = 'student3@example.com'), (SELECT id FROM courses WHERE title = 'Python Programming Bootcamp'), '2024-10-25', 'approved', 'paid'),
((SELECT id FROM students WHERE email = 'student4@example.com'), (SELECT id FROM courses WHERE title = 'Digital Marketing Certification'), '2024-11-01', 'pending', 'pending'),
((SELECT id FROM students WHERE email = 'student5@example.com'), (SELECT id FROM courses WHERE title = 'Data Science with Machine Learning'), '2024-11-10', 'approved', 'paid');

-- Insert sample events
INSERT INTO events (title, description, event_date, location, max_attendees) VALUES
('UIT Tech Conference 2024', 'Annual technology conference featuring industry experts and student presentations.', '2024-12-15 09:00:00+05:00', 'UIT Main Auditorium', 200),
('Career Fair 2024', 'Meet with top employers and explore career opportunities in technology and business.', '2024-12-20 10:00:00+05:00', 'UIT Sports Complex', 500),
('AI Workshop Series', 'Hands-on workshop series covering the latest trends in artificial intelligence.', '2024-11-30 14:00:00+05:00', 'Computer Lab A', 50),
('Entrepreneurship Seminar', 'Learn from successful entrepreneurs about starting and scaling businesses.', '2024-12-05 15:00:00+05:00', 'Business School Auditorium', 100),
('Open House 2025', 'Explore UIT facilities and meet faculty members. Perfect for prospective students.', '2025-01-15 10:00:00+05:00', 'UIT Campus', 300);

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, author_id, category, is_published, published_at) VALUES
('The Future of Artificial Intelligence in Education', 'Artificial Intelligence is revolutionizing the education sector...', 'Exploring how AI is transforming modern education systems.', (SELECT id FROM instructors WHERE email = 'usman.malik@uitu.edu.pk'), 'Technology', true, '2024-10-15 10:00:00+05:00'),
('Sustainable Engineering Practices', 'As engineers, we have a responsibility to create sustainable solutions...', 'Discussing the importance of sustainability in engineering.', (SELECT id FROM instructors WHERE email = 'sarah.khan@uitu.edu.pk'), 'Engineering', true, '2024-10-20 14:30:00+05:00'),
('Digital Marketing Trends 2024', 'The digital marketing landscape is constantly evolving...', 'Latest trends and strategies in digital marketing.', (SELECT id FROM instructors WHERE email = 'muhammad.ali@uitu.edu.pk'), 'Marketing', true, '2024-10-25 09:15:00+05:00'),
('Software Development Best Practices', 'Writing clean, maintainable code is essential for any software project...', 'Essential practices for professional software development.', (SELECT id FROM instructors WHERE email = 'fatima.sheikh@uitu.edu.pk'), 'Programming', true, '2024-11-01 11:00:00+05:00');

-- Insert sample testimonials
INSERT INTO testimonials (student_name, program, quote, rating, is_approved) VALUES
('Ali Ahmad', 'BS Computer Science', 'UIT has provided me with excellent education and practical skills that prepared me for my career in tech.', 5, true),
('Ayesha Khan', 'BS Software Engineering', 'The faculty at UIT is incredibly supportive and the curriculum is industry-relevant.', 5, true),
('Hassan Ali', 'Python Programming Bootcamp', 'The bootcamp was intensive but worth it. I landed a job as a Python developer right after completion.', 4, true),
('Fatima Malik', 'Digital Marketing Certification', 'Great course content and practical assignments. Highly recommend for anyone interested in digital marketing.', 5, true),
('Omar Sheikh', 'Data Science Program', 'The hands-on approach to learning data science at UIT is exceptional. Real-world projects made all the difference.', 5, true),
('Sara Ahmed', 'BBA Business Administration', 'UIT business program gave me the foundation I needed to start my own company.', 4, true);

-- Insert sample event attendees
INSERT INTO event_attendees (event_id, student_id, attendance_status) VALUES
((SELECT id FROM events WHERE title = 'UIT Tech Conference 2024'), (SELECT id FROM students WHERE email = 'student1@example.com'), 'registered'),
((SELECT id FROM events WHERE title = 'UIT Tech Conference 2024'), (SELECT id FROM students WHERE email = 'student2@example.com'), 'registered'),
((SELECT id FROM events WHERE title = 'Career Fair 2024'), (SELECT id FROM students WHERE email = 'student3@example.com'), 'registered'),
((SELECT id FROM events WHERE title = 'AI Workshop Series'), (SELECT id FROM students WHERE email = 'student4@example.com'), 'registered'),
((SELECT id FROM events WHERE title = 'Entrepreneurship Seminar'), (SELECT id FROM students WHERE email = 'student5@example.com'), 'registered');