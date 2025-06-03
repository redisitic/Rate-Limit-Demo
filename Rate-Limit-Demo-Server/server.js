const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(express.json());

const users = {};

// Register user (for testing)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  if (users[username]) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users[username] = hashed;
  res.json({ message: 'User registered' });
});

// Login without rate limiting
app.post('/api/login-no-limit', async (req, res) => {
  const { username, password } = req.body;
  const hashed = users[username];
  if (!hashed) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const match = await bcrypt.compare(password, hashed);
  if (match) {
    return res.json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid username or password' });
});

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login with rate limiting
app.post('/api/login-limited', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const hashed = users[username];
  if (!hashed) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const match = await bcrypt.compare(password, hashed);
  if (match) {
    return res.json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid username or password' });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth server listening on port ${PORT}`);
});
