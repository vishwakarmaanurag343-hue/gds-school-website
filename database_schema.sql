CREATE DATABASE IF NOT EXISTS gds_school_db;
USE gds_school_db;

-- Table for Contact Form & Popup Enquiries
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    child_name VARCHAR(255),
    class_interested VARCHAR(50),
    message TEXT,
    source VARCHAR(50),
    contact_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Admission Applications
CREATE TABLE IF NOT EXISTS admissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_ref VARCHAR(50) UNIQUE NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    dob DATE,
    grade_applying VARCHAR(50),
    gender VARCHAR(20),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Admin Users
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- In production, store HASHED passwords only
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Admin User (Only if table is empty)
INSERT INTO admins (email, password)
SELECT * FROM (SELECT 'globaldiscoveryschool@gmail.com', 'GDS@1234##2015') AS tmp
WHERE NOT EXISTS (
    SELECT email FROM admins WHERE email = 'globaldiscoveryschool@gmail.com'
) LIMIT 1;
