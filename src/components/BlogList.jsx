import React, { useEffect, useState } from 'react';
import blogApi from '../api/blogApi';
import LikeButton from './LikeButton';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await blogApi.post('/api/get_blogs/');
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleLikeToggle = async () => {
  await fetchBlogs(); // refresh full blog list from server after like toggle
};

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div style={styles.wrapper}>
      {blogs.length === 0 ? (
        <p style={styles.emptyText}>No blogs found.</p>
      ) : (
        blogs.map(blog => (
          <div
            key={blog.id}
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.leftSection}>
              <h2 style={styles.title}>{blog.title}</h2>
              <p style={styles.content}>
                {blog.content.length > 180
                  ? blog.content.substring(0, 180) + '...'
                  : blog.content}
              </p>
              <div style={styles.metaRow}>
                <p style={styles.meta}><strong>Author:</strong> {blog.author_name || 'Unknown'}</p>
                <p style={styles.meta}><strong>Created:</strong> {blog.updated_at ? formatDate(blog.updated_at) : 'N/A'}</p>
              </div>
            </div>
            <div style={styles.rightSection}>
              <LikeButton
  blogId={blog.id}
  isLiked={blog.is_liked}
  likeCount={blog.like_count}
  onLikeToggle={() => handleLikeToggle()}
/>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    padding: '24px',
    backgroundColor: '#f8fafc',
    fontFamily: `'Inter', 'Segoe UI', sans-serif`,
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
  },
  leftSection: {
    flex: 1,
    paddingRight: '16px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '80px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '10px',
  },
  content: {
    fontSize: '15px',
    color: '#334155',
    lineHeight: '1.6',
    marginBottom: '14px',
  },
  metaRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: '13px',
    color: '#64748b',
    margin: 0,
  },
  emptyText: {
    color: '#64748b',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '40px',
  },
};

export default BlogList;
