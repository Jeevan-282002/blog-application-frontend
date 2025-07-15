import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import blogApi from '../api/blogApi';

const MyBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const res = await blogApi.post('/api/get_my_blog_list/');
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      showMessage("🔐 Login required to fetch your blogs.");
    }
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setEditTitle(blog.title);
    setEditContent(blog.content);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await blogApi.post('/api/edit_blog/', {
        action_type: "Edit Blog",
        blog_id: selectedBlog.id,
        title: editTitle,
        content: editContent,
      });
      showMessage('✅ Blog updated successfully!');
      setShowModal(false);
      await fetchMyBlogs();
    } catch (err) {
      console.error('Update failed:', err);
      showMessage('❌ Failed to update blog.');
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await blogApi.post('/api/edit_blog/', {
        action_type: "Delete Blog",
        blog_id: deleteId,
      });
      showMessage('🗑️ Blog deleted successfully!');
      fetchMyBlogs();
    } catch (err) {
      console.error("Delete error:", err);
      showMessage("❌ Failed to delete blog.");
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const showMessage = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.pageTitle}>My Blog Posts</h2>

      {blogs.length === 0 ? (
        <p style={styles.emptyText}>You haven't written any blogs yet.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} style={styles.card}>
            <h3 style={styles.blogTitle}>{blog.title}</h3>
            <p style={styles.blogContent}>{blog.content}</p>
            <div style={styles.actions}>
              <button onClick={() => openEditModal(blog)} style={styles.editBtn}>
                <AiFillEdit size={18} style={{ marginRight: '6px' }} />
                Edit
              </button>
              <button onClick={() => confirmDelete(blog.id)} style={styles.deleteBtn}>
                <AiFillDelete size={18} style={{ marginRight: '6px' }} />
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {showModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Edit Blog Post</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              style={styles.input}
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Content"
              style={styles.textarea}
            />
            <div style={styles.modalActions}>
              <button onClick={handleUpdate} style={styles.saveBtn}>Update</button>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Confirm Delete</h3>
            <p style={{ color: '#475569', marginBottom: '18px' }}>
              Are you sure you want to delete this blog?
            </p>
            <div style={styles.modalActions}>
              <button onClick={handleDelete} style={styles.deleteBtn}>Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div style={styles.popup}>
          {popupMessage}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '820px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: `'Inter', 'Segoe UI', sans-serif`,
  },
  pageTitle: {
    fontSize: '32px',
    marginBottom: '28px',
    color: '#0f172a',
    fontWeight: 700,
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '10px',
  },
  card: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '22px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
  },
  blogTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#0f172a',
    fontWeight: 600,
  },
  blogContent: {
    fontSize: '16px',
    color: '#475569',
    marginBottom: '14px',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.3s ease',
  },
  deleteBtn: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.3s ease',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    width: '400px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#1e293b',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    marginBottom: '14px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    height: '130px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    resize: 'vertical',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '18px',
  },
  saveBtn: {
    background: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  cancelBtn: {
    background: '#94a3b8',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  popup: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: '#1e293b',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '8px',
    zIndex: 9999,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    fontSize: '14px',
  },
  emptyText: {
    color: '#64748b',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '40px',
  },
};

export default MyBlogList;
