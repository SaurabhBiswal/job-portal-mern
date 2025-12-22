import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await login(email, password);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('userName', res.data.name || email);

      setMessage('Login successful! Ab jobs page bana rahe hain 🚀');

      // Temporary comment - jab JobList page ban jaayega tab uncomment kar dena
      // setTimeout(() => {
      //   navigate('/jobs');
      // }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed - Wrong email or password');
    } finally {
      setLoading(false);  // Ye hamesha chalega, success ho ya fail
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>Login to Job Portal</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: loading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px' 
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <p style={{ 
          marginTop: '20px', 
          color: message.includes('successful') ? 'green' : 'red',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {message}
        </p>
      )}

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        New user? Register first from old frontend or wait for Register page 🚀
      </p>
    </div>
  );
};

export default Login;