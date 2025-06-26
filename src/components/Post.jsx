import React, { useState } from 'react';

const Post = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert("No image selected.");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userId", "665f1181a0b4df001f9f509a"); // Example user ID

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Image uploaded successfully!");
        setImageFile(null);
      } else {
        alert("❌ Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("❌ Error uploading image: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Image Post</h2>

      <input
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
      )}

      <button
        onClick={handleImageUpload}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
      >
        Upload
      </button>
    </div>
  );
};

export default Post;

