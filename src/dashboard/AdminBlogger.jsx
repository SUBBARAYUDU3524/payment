import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "react-daisyui";
import axios from "axios";

const AdminBlogger = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        title,
        content,
      });
      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
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
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Student Blogger
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Post Form */}
          <div className="md:col-span-1">
            <Card className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Create a New Blog Post
              </h2>
              <form onSubmit={handleCreatePost}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your blog title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="content"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="6"
                    placeholder="Write your blog content here..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button className="btn btn-primary" type="submit">
                    Post
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Blog Posts */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {posts &&
                posts.map((post) => (
                  <Card
                    key={post._id}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <h3 className="text-xl font-bold mb-2 text-black">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex justify-end">
                      <Button className="btn btn-secondary mr-2">
                        Read More
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogger;
