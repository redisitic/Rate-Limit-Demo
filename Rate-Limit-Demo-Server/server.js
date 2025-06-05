const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

const users = {
  user: bcrypt.hashSync('user', 10) // username: demo, password: password123
};

app.use(session({
  secret: 'demo-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    secure: false,
    sameSite: 'lax'
  }
}));

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  if (users[username]) return res.status(409).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  users[username] = hashed;
  res.json({ message: 'User registered' });
});

// Login without rate limiting (sets session)
app.post('/api/login-no-limit', async (req, res) => {
  const { username, password } = req.body;
  const hashed = users[username];
  if (!hashed) return res.status(401).json({ message: 'Invalid username or password' });

  const match = await bcrypt.compare(password, hashed);
  if (match) {
    req.session.username = username;
    return res.json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid username or password' });
});

// Login with rate limiting
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts, try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/login-limited', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const hashed = users[username];
  if (!hashed) return res.status(401).json({ message: 'Invalid username or password' });

  const match = await bcrypt.compare(password, hashed);
  if (match) {
    req.session.username = username;
    return res.json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid username or password' });
});

// test valid session
app.get('/api/profile', (req, res) => {
  if (req.session.username) {
    return res.json({ message: `Welcome, ${req.session.username}` });
  }
  return res.status(401).json({ message: 'Unauthorized' });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
