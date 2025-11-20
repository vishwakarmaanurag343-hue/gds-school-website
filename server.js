
/**
 * BACKEND SERVER
 * Run this using: node server.js
 * Dependencies needed: npm install express mysql2 cors body-parser dotenv
 */

import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// // IP Restriction Middleware
// const checkAllowedIP = (req, res, next) => {
//     const allowedIP = process.env.ALLOWED_IP || '::1';
//     const clientIP = req.ip || req.connection.remoteAddress;

//     // Normalize IP (handle IPv6 mapping to IPv4 if needed)
//     // const normalizedClientIP = clientIP === '::1' ? '::1' : clientIP.replace(/^.*:/, '');
//     // const normalizedAllowedIP = allowedIP === '::1' ? '::1' : allowedIP.replace(/^.*:/, '');

//     if (normalizedClientIP === normalizedAllowedIP || clientIP === allowedIP) {
//         next();
//     } else {
//         console.log(`Access denied for IP: ${clientIP}`);
//         res.status(403).json({ success: false, message: 'Access denied: Unauthorized IP address' });
//     }
// };

// Database Connection
// Create a .env file with: DB_HOST=localhost, DB_USER=root, DB_PASS=yourpassword, DB_NAME=gds_school_db
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234', // Change this to your MySQL password
    database: process.env.DB_NAME || 'gds_school_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL Database');
        connection.release();
    }
});

// --- POST ROUTES (Submit Data) ---

// API: Admin Login
app.get('/api/check-access', (req, res) => {
    res.status(200).json({ success: true, message: 'Access granted' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM admins WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Login successful', user: { email: results[0].email } });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// API: Handle Contact Form & Popup Enquiries
app.post('/api/leads', (req, res) => {
    const { parentName, phone, childName, classInterested, message, source, contactMethod } = req.body;
    const email = req.body.email || 'Not Provided';

    const sql = `
        INSERT INTO leads (parent_name, email, phone, child_name, class_interested, message, source, contact_method)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [parentName, email, phone, childName, classInterested, message, source, contactMethod], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(200).json({ success: true, message: 'Lead saved successfully', id: result.insertId });
    });
});

// API: Handle Admission Applications
app.post('/api/admissions', (req, res) => {
    const {
        parentName, relationship, email, phone,
        studentName, dob, grade, gender,
        address, city, state, zip
    } = req.body;

    // Generate a random Ref ID
    const refId = `APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const sql = `
        INSERT INTO admissions 
        (application_ref, parent_name, relationship, email, phone, student_name, dob, grade_applying, gender, street_address, city, state, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        refId, parentName, relationship, email, phone,
        studentName, dob, grade, gender,
        address, city, state, zip
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(200).json({ success: true, message: 'Application submitted', refId });
    });
});

// --- GET ROUTES (Read Data for Admin) ---

// API: Get All Leads (Contact Form)
app.get('/api/leads', (req, res) => {
    const sql = 'SELECT * FROM leads ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(200).json(results);
    });
});

// API: Get All Admissions
app.get('/api/admissions', (req, res) => {
    const sql = 'SELECT * FROM admissions ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(200).json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
