import React, { useEffect, useState } from "react";
import BlogDetails from "./Blog";
import { useParams } from "react-router-dom";
import axios from "axios";

const FirstBlog = () => {
  const { id } = useParams(); // Same user ID as Home
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}/blogs`);
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [id]);

  if (loading) return <div className="text-amber-50 p-8">Loading blogs...</div>;

  return (
    <div className="mb-8">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogDetails
            key={blog._id}
            blogId={blog._id}
            date={new Date(blog.createdAt).toLocaleDateString()}
            title={blog.title}
            image={`http://localhost:3000${blog.image}`}
            button="Read More"
          />
        ))
      ) : (
        <div className="text-amber-50 p-8">No blogs found for this user.</div>
      )}
    </div>
  );
};

export default FirstBlog;
