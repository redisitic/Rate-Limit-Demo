import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginNoLimit from './pages/LoginNoLimit';
import LoginLimited from './pages/LoginLimited';

export default function App() {
  return (
    <Router>
      <div>
        <h1>Login Rate Limiting Demo</h1>
        <nav>
          <ul>
            <li><Link to="/login-no-limit">Login Without Rate Limiting</Link></li>
            <li><Link to="/login-limited">Login With Rate Limiting</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login-no-limit" element={<LoginNoLimit />} />
          <Route path="/login-limited" element={<LoginLimited />} />
        </Routes>
      </div>
    </Router>
  );
}
