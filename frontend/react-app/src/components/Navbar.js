import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav style={{ background: '#333', padding: '1rem', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2><Link to="/jobs" style={{ color: 'white', textDecoration: 'none' }}>Job Portal</Link></h2>
        <div>
          <Link to="/jobs" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Jobs</Link>
          {role === 'seeker' && (
            <Link to="/applied-jobs" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Applied Jobs</Link>
          )}
          {role === 'employer' && (
            <Link to="/employer-dashboard" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Dashboard</Link>
          )}
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;