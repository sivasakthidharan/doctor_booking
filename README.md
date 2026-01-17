# Doctor Booking Backend API

## Project Overview
This is a Doctor Booking Backend API built using Node.js, Express, and PostgreSQL.
doctor-booking-backend/
│
├── server.js
├── db.js
├── .env
├── middleware/
│   └── auth.js
├── routes/
│   ├── admin.routes.js
│   └── doctor.routes.js
├── package.json
└── README.md
git clone https://github.com/your-username/doctor-booking-backend.git
cd doctor-booking-backend
npm install
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  experience_years INT NOT NULL,
  consultation_modes TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO admins (email, password)
VALUES (
  'admin@gmail.com',
  '$2b$10$N9qo8uLOickgx2ZMRZo5e.ej5y9q4Pz8vKXu9lqZlQ8K0r2Zr0mW6'
);
Plain password: admin123

PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=doctor_booking
DB_PORT=5432
JWT_SECRET=supersecretkey

node server.js
http://localhost:5000
Authentication Flow

Admin logs in using /admin/login

Server returns a JWT token

Token must be sent in Authorization header for protected routes
Authorization: Bearer <JWT_TOKEN>

{
  "email": "admin@gmail.com",
  "password": "admin123"
}
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Headers

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
{
  "name": "Dr Raj",
  "specialization": "Orthopedic",
  "experience_years": 8,
  "consultation_modes": ["online", "offline"]
}
Response

{
  "success": true,
  "data": {
    "id": 1,
    "name": "Dr Raj",
    "specialization": "Orthopedic",
    "experience_years": 8,
    "consultation_modes": ["online", "offline"],
    "is_active": true
  }
}
Headers

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json


Request Body

{
  "is_active": false
}


Response

{
  "message": "Doctor status updated"
}

GET /doctors

Response

{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dr Raj",
      "specialization": "Orthopedic",
      "experience_years": 8,
      "consultation_modes": ["online", "offline"]
    }
  ]
}

🔸 GET /doctors/:id

Description: Get doctor details by ID

Response

{
  "success": true,
  "data": {
    "id": 1,
    "name": "Dr Raj",
    "specialization": "Orthopedic",
    "experience_years": 8,
    "consultation_modes": ["online", "offline"]
  }
