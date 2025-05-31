import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorInfo from "./AuthorInfo";
import axios from "axios";

const Explore = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${blogId}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <div className="text-amber-50 p-8">Loading...</div>;
  if (error) return <div className="text-amber-50 p-8">Error: {error}</div>;
  if (!blog) return <div className="text-amber-50 p-8">Blog not found!</div>;

  return <AuthorInfo blog={blog} />;
};

export default Explore;