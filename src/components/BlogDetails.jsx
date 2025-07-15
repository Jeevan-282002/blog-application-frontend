import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogApi from '../api/blogApi';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    blogApi.get(`/api/blogs/${id}/`)
      .then((res) => {
        setBlog(res.data);
        setLiked(res.data.is_liked || false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleLike = () => {
    blogApi.post('/api/blogs/like/', { blog_id: id }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    .then((res) => {
      setLiked(!liked);
    })
    .catch(err => console.error(err));
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <button onClick={handleLike}>
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
};

export default BlogDetails;
