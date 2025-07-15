import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import NewBlogPage from './pages/NewBlogPage';
import Navbar from './components/Navbar';
import MyBlogList from './pages/MyBlogList';
import RegisterPage from './pages/RegisterPage';
import { LoadingProvider, useLoading } from "./context/LoadingContext.jsx";

import Loader from './components/Loader';

const AppContent = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new" element={<NewBlogPage />} />
        <Route path="/my-blogs" element={<MyBlogList />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
