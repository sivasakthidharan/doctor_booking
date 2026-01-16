const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./db"); // ✅ ADD THIS LINE (DB connection)

const doctorRoutes = require("./routes/doctor.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/doctors", doctorRoutes);
app.use("/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Doctor Booking Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
