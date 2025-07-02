
import React, { useEffect, useState } from "react";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center text-lg">
          No posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border"
          >
            {/* Top User Info */}
            <div className="flex items-center p-4 border-b">
              {post.user?.image ? (
                <img
                  src={`http://localhost:5000${post.user.image}`}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold mr-3">
                  {post.user?.name?.[0] || "U"}
                </div>
              )}
              <span className="text-gray-800 font-semibold text-sm">
                {post.user?.name || "Unknown User"}
              </span>
            </div>

            {/* Post Image */}
            {post.image && (
              <img
                src={`http://localhost:5000${post.image}`}
                alt="Post"
                className="w-full h-64 object-cover"
              />
            )}

            {/* Post Text / Caption */}
            {post.text && (
              <div className="p-4 text-gray-700 text-sm">
                {post.text}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;
