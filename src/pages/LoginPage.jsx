import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await blogApi.post('/api/token/', { username, password });
      login(res.data.access, res.data.refresh);
      navigate('/');
    } catch (err) {
      setError('❌ Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Hello Again 👋</h2>
        <p style={styles.subtext}>Sign in to continue to your dashboard</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Sign In</button>
          <p style={styles.linkWrap}>
            Don't have an account?{' '}
            <a href="/register" style={styles.link}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #f0fdfa, #e0f2fe)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: `'Inter', 'Segoe UI', sans-serif`,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '42px 34px',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '420px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '6px',
  },
  subtext: {
    textAlign: 'center',
    fontSize: '15px',
    color: '#64748b',
    marginBottom: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '-8px',
  },
  linkWrap: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#475569',
    marginTop: '12px',
  },
  link: {
    color: '#1d4ed8',
    fontWeight: 500,
    textDecoration: 'none',
  },
};

export default LoginPage;
