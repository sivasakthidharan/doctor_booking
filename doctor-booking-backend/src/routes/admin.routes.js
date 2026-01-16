const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * POST /admin/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /admin/doctors (Protected)
 */
router.post("/doctors", auth, async (req, res) => {
  try {
    const { name, specialization, experience_years, consultation_modes } = req.body;

    if (!name || !specialization || !experience_years || !consultation_modes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO doctors
       (name, specialization, experience_years, consultation_modes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, specialization, experience_years, consultation_modes]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PATCH /admin/doctors/:id/status (Protected)
 */
router.patch("/doctors/:id/status", auth, async (req, res) => {
  try {
    const { is_active } = req.body;

    await pool.query(
      "UPDATE doctors SET is_active=$1 WHERE id=$2",
      [is_active, req.params.id]
    );

    res.json({ message: "Doctor status updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
