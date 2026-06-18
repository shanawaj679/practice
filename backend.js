const express = require("express");
const app = express();

const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shanawaj@#$8123",
    database: "practice"
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("DB Connected Successfully");
});

// CREATE
app.post("/postdata", async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).send("All fields are required");
        }

        const [existingUser] = await db.promise().query(
            "SELECT email FROM loginpage WHERE email=?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.promise().query(
            "INSERT INTO loginpage(email,name,password) VALUES(?,?,?)",
            [email, name, hashedPassword]
        );

        res.send("Registered Successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// READ
app.get("/getdata", async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            "SELECT email,name FROM loginpage"
        );

        res.json(rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// UPDATE PASSWORD
app.put("/updatedata", async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await db.promise().query(
            "UPDATE loginpage SET password=? WHERE email=?",
            [hashedPassword, email]
        );

        if (rows.affectedRows === 0) {
            return res.status(404).send("User not found");
        }

        res.send("Password updated successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

// DELETE
app.delete("/deletedata", async (req, res) => {
    try {
        const { email } = req.body;

        const [rows] = await db.promise().query(
            "DELETE FROM loginpage WHERE email=?",
            [email]
        );

        if (rows.affectedRows === 0) {
            return res.status(404).send("User not found");
        }

        res.send("User deleted successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});