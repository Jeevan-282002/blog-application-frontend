import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaFeatherAlt, FaBookOpen } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { FiLogOut, FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = () => {
  logout();
  navigate('/');
};

  const handleNavigate = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        <FaFeatherAlt style={styles.logoIcon} />
        <span style={styles.logoText}>InkPress</span>
      </Link>

      <div style={styles.navItems}>
        {isAuthenticated && (
          <Link
            to="/new"
            style={{
              ...styles.link,
              ...(hoveredItem === 'new' ? styles.linkHover : {})
            }}
            onMouseEnter={() => setHoveredItem('new')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <MdPostAdd style={styles.icon} /> New Post
          </Link>
        )}

        {isAuthenticated && (
          <Link
            to="/my-blogs"
            style={{
              ...styles.link,
              ...(hoveredItem === 'my' ? styles.linkHover : {})
            }}
            onMouseEnter={() => setHoveredItem('my')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <FaBookOpen style={styles.icon} /> My Blogs
          </Link>
        )}

        {isAuthenticated ? (
          <button onClick={handleLogout} style={styles.button}>
            <FiLogOut style={styles.icon} /> Logout
          </button>
        ) : (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={styles.button}
            >
              <FiUser style={styles.icon} /> Account ⏷
            </button>

            {showDropdown && (
              <div style={styles.dropdown}>
                <button
                  style={styles.dropdownItem}
                  onClick={() => handleNavigate('/login')}
                >
                  <FiLogIn style={styles.icon} /> Sign In
                </button>
                <button
                  style={styles.dropdownItem}
                  onClick={() => handleNavigate('/register')}
                >
                  <FiUserPlus style={styles.icon} /> Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#3c4d64',
    padding: '14px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    borderRadius: '8px',
    margin: '8px 16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  logoIcon: {
    color: '#ffffff',
    fontSize: '22px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: `'Segoe UI', 'Poppins', 'Inter', sans-serif`,
  },
  navItems: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  linkHover: {
    backgroundColor: '#475569',
    color: '#ffffff',
  },
  button: {
    background: '#3b82f6',
    border: 'none',
    padding: '8px 14px',
    color: '#ffffff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  dropdown: {
    position: 'absolute',
    top: '40px',
    right: 0,
    backgroundColor: '#ffffff',
    color: '#1e293b',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    borderRadius: '8px',
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    fontSize: '16px',
  },
};

export default Navbar;
