const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// ================================
// MySQL Connection
// ================================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


// Connect to MySQL
db.connect((err) => {

    if (err) {
        console.log("MySQL connection failed:");
        console.log(err.message);
        return;
    }

    console.log("MySQL connected successfully!");

});


// ================================
// Home Route
// ================================

app.get("/", (req, res) => {

    res.send("AI Placement Tracker Backend is running!");

});


// ================================
// GET ALL USERS
// ================================

app.get("/api/users", (req, res) => {

    const sql = "SELECT id, name, email FROM users";

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: err.message
            });
        }

        res.json(results);
    });

});
// ================================
// GET ALL JOBS
// ================================

app.get("/api/jobs", (req, res) => {

    const sql = "SELECT * FROM jobs ORDER BY id DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.log("Database error:", err.message);

            return res.status(500).json({
                message: err.message
            });
        }

        res.json(results);

    });

});
// ================================
// ADD NEW JOB
// ================================

app.post("/api/jobs", (req, res) => {

    const {
        company,
        role,
        location,
        package: salaryPackage,
        status,
        deadline,
        user_id
    } = req.body;

    const sql = `
        INSERT INTO jobs
        (company, role, location, package, status, deadline, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        company,
        role,
        location,
        salaryPackage,
        status || "Applied",
        deadline,
        user_id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.log("Database error:", err.message);

            return res.status(500).json({
                message: err.message
            });

        }

        res.status(201).json({
            message: "Job added successfully",
            jobId: result.insertId
        });

    });

});
// ================================
// UPDATE JOB
// ================================

app.put("/api/jobs/:id", (req, res) => {

    const { id } = req.params;

    const {
        company,
        role,
        location,
        package: salaryPackage,
        status,
        deadline
    } = req.body;

    const sql = `
        UPDATE jobs
        SET company = ?,
            role = ?,
            location = ?,
            package = ?,
            status = ?,
            deadline = ?
        WHERE id = ?
    `;

    const values = [
        company,
        role,
        location,
        salaryPackage,
        status,
        deadline,
        id
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        res.json({
            message: "Job updated successfully"
        });

    });

});

// ================================
// DELETE JOB
// ================================

app.delete("/api/jobs/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM jobs WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        res.json({
            message: "Job deleted successfully"
        });

    });

});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});