import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const Post = () => {
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile && !text.trim()) {
      return toast.error("Please add a caption or select an image.");
    }

    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    if (text) formData.append("text", text);

    const url = editingPostId
      ? `http://localhost:5000/api/posts/${editingPostId}`
      : "http://localhost:5000/api/posts";

    const method = editingPostId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Post ${editingPostId ? "updated" : "created"} successfully!`);
        setImageFile(null);
        setText("");
        setEditingPostId(null);
        fetchMyPosts();
      } else {
        toast.error(" Failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      toast.error("Error uploading post: " + error.message);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) setMyPosts(data);
    } catch (err) {
      toast.error(" Failed to fetch posts.");
    }
  };

  const handleEdit = (post) => {
    setText(post.text);
    setEditingPostId(post._id);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Post deleted!");
        fetchMyPosts();
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      toast.error("Error deleting post: " + error.message);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Post Upload Form */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingPostId ? "Edit Post" : "Create a Post"}
        </h2>

        <textarea
          placeholder="Write a caption..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded p-2 mb-3 text-sm"
          rows="3"
        />

        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2 text-sm"
        />

        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="mb-2 rounded border max-h-60"
          />
        )} */}

        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleImageChange}
          className="hidden"
        />

        <label
          htmlFor="fileInput"
          className="inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm mb-2"
        >
          {imageFile ? "Change Image" : "Choose an Image"}
        </label>

        {imageFile && (
          <p className="text-sm text-gray-700 mb-2">Selected: {imageFile.name}</p>
        )}

        <button
          onClick={handleImageUpload}
          className="bg-yellow-500 ml-5 cursor-pointer hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm mr-2"
        >
          {editingPostId ? "Update" : "Upload"}
        </button>

        {editingPostId && (
          <button
            onClick={() => {
              setEditingPostId(null);
              setText("");
              setImageFile(null);
            }}
            className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-black px-4 py-2 rounded text-sm"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Display My Posts */}
      <div>
        <h3 className="text-lg font-bold mb-4">My Posts</h3>
        {myPosts.length === 0 ? (
          <p className="text-gray-500">You haven't posted anything yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myPosts.map((post) => (
              <div key={post._id} className="rounded-lg shadow-md border overflow-hidden relative group">
                {post.image && (
                  <img
                    src={`http://localhost:5000${post.image}`}
                    alt="Post"
                    className="w-full object-fill h-60"
                  />
                )}
                <div className="p-3 text-sm text-gray-800">
                  <p className="font-medium mb-1">{post.text || "No caption"}</p>
                  <p className="text-xs text-gray-500">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-blue-100 cursor-pointer text-blue-600 px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-100 cursor-pointer text-red-600 px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;




