CREATE DATABASE upskill_institution;
use upskill_institution;

-- SHOW TABLES;

-- SHOW COLUMNS FROM institution_registration;
-- SHOW COLUMNS FROM institution_course;
-- DROP TABLE institution_course;


-- SET SQL_SAFE_UPDATES = 0;
-- SET SQL_SAFE_UPDATES = 1;



CREATE TABLE institution_enquiry (
    enquiry_number INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    qualification VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    course VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS diango_migrations;

CREATE TABLE institution_registration (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    registration_number VARCHAR(10) NOT NULL UNIQUE,
    date_of_registration DATE NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    address VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    qualification VARCHAR(50) NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    course_duration VARCHAR(50) NOT NULL,
    total_fees DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

