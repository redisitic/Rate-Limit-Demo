import { useState } from 'react';
import axios from 'axios';

export default function LoginNoLimit() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3001/api/login-no-limit',
        { username, password },
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/profile', {
        withCredentials: true
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error fetching profile');
    }
  };

  return (
    <div>
      <h2>Login Without Rate Limiting (Vulnerable)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <br />
      <button onClick={getProfile}>Get Profile (Test Session)</button>

      {message && <p>{message}</p>}
    </div>
  );
}
