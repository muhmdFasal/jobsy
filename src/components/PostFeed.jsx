
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
    <div className="min-h-screen bg-gradient-to-br rounded-2xl from-slate-100  py-10 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          📸 Latest Posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <p className="text-center col-span-full text-lg text-gray-600">
              No posts yet.
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Header: User Info */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  {post.user?.image ? (
                    <img
                      src={`http://localhost:5000${post.user.image}`}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                      {post.user?.name?.[0] || "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">
                      {post.user?.name || "Unknown User"}
                    </p>
                    <p className="text-gray-400 text-xs">Posted just now</p>
                  </div>
                </div>

                {/* Image */}
                {post.image && (
                  <img
                    src={`http://localhost:5000${post.image}`}
                    alt="Post"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}

                {/* Text / Caption */}
                {post.text && (
                  <div className="p-4 text-gray-700 text-sm leading-relaxed flex-1">
                    {post.text}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
