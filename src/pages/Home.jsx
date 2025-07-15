// src/pages/Home.jsx

import React from 'react';
import BlogList from '../components/BlogList';

const Home = () => {
  return (
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <header style={styles.hero}>
        <h1 style={styles.title}>
          Welcome to <span style={styles.brand}>InkPress</span>
        </h1>
        <p style={styles.subtitle}>
          A space where ideas, stories, and tutorials come to life. Explore curated blogs from developers and creators.
        </p>
      </header>

      {/* Blog Feed */}
      <section style={styles.feed}>
        <h2 style={styles.feedHeading}>All Blogs</h2>
        <BlogList />
      </section>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    padding: '20px',
    maxWidth: '960px',
    margin: '0 auto',
  },
 hero: {
  textAlign: 'center',
  padding: '40px 15px', // 🧭 Moderate height
  backgroundColor: '#f1f5f9',
  borderRadius: '12px',
  marginBottom: '30px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
},

title: {
  fontSize: '32px', // 🧭 Balanced size
  marginBottom: '12px',
  color: '#0f172a',
  fontWeight: 700,
},

subtitle: {
  fontSize: '17px',
  color: '#475569',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6',
},


  brand: {
    color: '#3b82f6',
  },

  feed: {
    padding: '0 10px',
  },
  feedHeading: {
    fontSize: '26px',
    marginBottom: '20px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
    fontWeight: 600,
  },
};

export default Home;
