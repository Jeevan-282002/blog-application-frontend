import React, { useState } from 'react';
import blogApi from '../api/blogApi';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await blogApi.post('/api/register/', formData);
      navigate('/login');
    } catch (err) {
      setError('❌ Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>✨ Welcome to InkPress</h2>
        <p style={styles.subtext}>Create your free account and start blogging with passion 🚀</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <input
            name="username"
            placeholder="Choose a Username"
            onChange={handleChange}
            required
            style={styles.inputFull}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            style={styles.inputFull}
          />
          <input
            name="mobile_number"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
            style={styles.inputFull}
          />
          <input
            name="password"
            type="password"
            placeholder="Create a Password"
            onChange={handleChange}
            required
            style={styles.inputFull}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Create Account</button>
        </form>

        <p style={styles.loginLink}>
          Already a member? <a href="/login" style={styles.link}>Sign in here</a>
        </p>
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
    padding: '42px 36px',
    borderRadius: '16px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '520px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
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
  row: {
    display: 'flex',
    gap: '12px',
  },
  input: {
    flex: 1,
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    transition: '0.2s',
  },
  inputFull: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    transition: '0.2s',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '-8px',
  },
  loginLink: {
    marginTop: '18px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#475569',
  },
  link: {
    color: '#1d4ed8',
    textDecoration: 'none',
    fontWeight: 500,
  },
};

export default RegisterPage;
