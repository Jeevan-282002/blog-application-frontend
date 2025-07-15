import React, { useState } from 'react';
import blogApi from '../api/blogApi';
import { useNavigate } from 'react-router-dom';
import { FaPenNib } from 'react-icons/fa'; // optional icon for heading

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await blogApi.post('/api/add_blog/', { title, content });
      navigate('/');
    } catch (err) {
      const serverMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message;

      alert(serverMsg || 'Something went wrong.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          <FaPenNib style={{ marginRight: '10px', color: '#2563eb' }} />
          Create a New Blog Post
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter a catchy title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />

          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>🚀 Publish</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '700px',
    width: '100%',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.06)',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  heading: {
    fontSize: '30px',
    marginBottom: '28px',
    textAlign: 'center',
    color: '#1e293b',
    fontWeight: '600',
    fontFamily: `'Segoe UI', 'Poppins', 'Inter', sans-serif`,
    letterSpacing: '0.5px',
    lineHeight: '1.4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  textarea: {
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    height: '200px',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '14px',
    borderRadius: '10px',
    fontSize: '17px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.1s',
  },
};

export default BlogForm;
