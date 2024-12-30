import React, { useState, useEffect } from "react";
import { Card, Button } from "react-daisyui";
import axios from "axios";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post._id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-end">
                <Button className="btn btn-secondary mr-2">Read More</Button>
                <Button
                  className="btn btn-error"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-3xl text-white text-center">
            No posts available.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
