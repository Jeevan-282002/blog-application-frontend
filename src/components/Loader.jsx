import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => (
  <div style={styles.overlay}>
    <FaSpinner style={styles.spinner} />
  </div>
);

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  spinner: {
    fontSize: '40px',
    color: '#2563eb',
    animation: 'spin 1s linear infinite',
  },
};

// Add keyframe animation to global stylesheet
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  styleSheet.insertRule(`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
}

export default Loader;
