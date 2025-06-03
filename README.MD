# Login Rate Limiting Demo

This is a simple demonstration project to showcase the importance of rate limiting on login pages. It features:

- A React frontend with two login pages:
  - **Login Without Rate Limiting** — vulnerable to brute force and DoS attacks
  - **Login With Rate Limiting** — protects against rapid repeated login attempts

- A Node.js backend with:
  - User authentication storing passwords hashed with bcrypt
  - Rate limiting implemented on one login route
  - APIs for registration and login

---

## Features

- Passwords are securely hashed using bcrypt
- Rate limiting to prevent brute force and denial-of-service (DoS) attacks
- Brute force and DoS attack scripts included (Python) to test vulnerabilities
- Simple HTML form layouts without CSS frameworks

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python 3 (for attack scripts)
- `requests` Python package (`pip install requests`)

### Setup Backend

1. Install dependencies:

   ```bash
   cd backend
   npm install
````

2. Run the backend server:

   ```bash
   node server.js
   ```

### Setup Frontend

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Run the frontend app:

   ```bash
   npm start
   ```

3. Open `http://localhost:3000` in your browser

---

## Usage

1. Register a user via the register API (e.g., using Postman):

   ```http
   POST http://localhost:3001/api/register
   Content-Type: application/json

   {
     "username": "testuser",
     "password": "password123"
   }
   ```

2. Use the login pages to attempt login with and without rate limiting.

3. Run attack scripts to demonstrate vulnerabilities:

   * Brute force attack:

     ```bash
     python brute_force_attack.py
     ```

   * Denial of Service (DoS) attack:

     ```bash
     python dos_attack.py
     ```
