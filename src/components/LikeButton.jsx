import React, { useState } from 'react';
import blogApi from '../api/blogApi';

const LikeButton = ({ blogId, isLiked, likeCount, onLikeToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await blogApi.post('/api/toggle_like/', { blog_id: blogId });
      onLikeToggle(res.data);
    } catch (err) {
      console.error('Like toggle failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLikeToggle} style={styles.button} disabled={loading}>
      <span style={styles.heart}>{isLiked ? '❤️' : '🤍'}</span>
      <span style={styles.count}>{likeCount}</span>
    </button>
  );
};

const styles = {
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#e11d48',
    padding: '0',
  },
  heart: {
    fontSize: '22px',
  },
  count: {
    fontSize: '14px',
    color: '#475569',
  },
};

export default LikeButton;
