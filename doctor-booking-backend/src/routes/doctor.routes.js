const express = require("express");
const router = express.Router();
const pool = require("../db");

/**
 * GET /doctors
 * Public – only active doctors
 */
router.get("/", async (req, res) => {
  try {
    const { specialization } = req.query;

    let query = "SELECT * FROM doctors WHERE is_active = true";
    let values = [];

    if (specialization) {
      query += " AND specialization = $1";
      values.push(specialization);
    }

    const result = await pool.query(query, values);
    res.json({ success: true, data: result.rows });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /doctors/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;

    const result = await pool.query(
      "SELECT * FROM doctors WHERE id = $1 AND is_active = true",
      [doctorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
