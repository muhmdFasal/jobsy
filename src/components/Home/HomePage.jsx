// import { useEffect, useState } from "react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// export default function HomePage() {
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [newPost, setNewPost] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [posts, setPosts] = useState([]);

//   const loggedInUser = {
//     _id: "665f1181a0b4df001f9f509a",
//     name: "Fasal Jr",
//     email: "fasal@example.com",
//     avatar: "https://i.pravatar.cc/100?img=8",
//   };

//   useEffect(() => {
//     fetch("http://localhost:5000/api/posts")
//       .then((res) => res.json())
//       .then((data) => setPosts(data))
//       .catch((err) => console.error("Failed to load posts:", err));
//   }, []);

//   const handlePostSubmit = async () => {
//     if (newPost.trim() === "" && !imageFile) return;

//     const formData = new FormData();
//     formData.append("text", newPost);
//     formData.append("userId", loggedInUser._id);
//     if (imageFile) formData.append("image", imageFile);

//     try {
//       const res = await fetch("http://localhost:5000/api/posts", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setPosts([data, ...posts]);
//         setNewPost("");
//         setImageFile(null);
//       } else {
//         alert("\u274C Error: " + (data.message || "Post failed"));
//       }
//     } catch (err) {
//       alert("\u274C Error posting: " + err.message);
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <aside className="hidden md:block w-72 bg-white shadow-md border-r p-6">
//         <SidebarContent
//           user={loggedInUser}
//           newPost={newPost}
//           setNewPost={setNewPost}
//           handlePostSubmit={handlePostSubmit}
//           handleImageChange={handleImageChange}
//           imageFile={imageFile}
//         />
//       </aside>

//       {mobileSidebarOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           <aside className="w-72 bg-white p-6 h-full overflow-y-auto shadow-lg">
//             <button
//               className="mb-4 text-gray-500"
//               onClick={() => setMobileSidebarOpen(false)}
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//             <SidebarContent
//               user={loggedInUser}
//               newPost={newPost}
//               setNewPost={setNewPost}
//               handlePostSubmit={handlePostSubmit}
//               handleImageChange={handleImageChange}
//               imageFile={imageFile}
//             />
//           </aside>
//           <div
//             className="flex-1 bg-black bg-opacity-40"
//             onClick={() => setMobileSidebarOpen(false)}
//           />
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col">
//         <div className="md:hidden flex items-center justify-between px-4 py-3 bg-yellow-500 text-white shadow">
//           <h1 className="font-bold text-lg">Jobsy</h1>
//           <button onClick={() => setMobileSidebarOpen(true)}>
//             <Bars3Icon className="h-6 w-6" />
//           </button>
//         </div>

//         <section className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 text-white text-center">
//           <h2 className="text-3xl font-bold">Find Your Dream Job</h2>
//           <p className="mt-2 text-sm">Search, connect, and grow your career</p>
//         </section>

//         <div className="bg-white p-4 shadow-sm border-b">
//           <div className="max-w-2xl mx-auto flex">
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-l border border-gray-300 text-sm"
//               placeholder="Search jobs, companies..."
//             />
//             <button className="bg-yellow-500 px-4 py-2 rounded-r text-white text-sm font-semibold hover:bg-yellow-600">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Feed Area with Scrolling Hidden */}
//         <div className="p-6 h-[calc(100vh-220px)] overflow-y-auto scrollbar-hide">
//           <h3 className="text-xl font-semibold mb-4">Latest Posts</h3>
//           <div className="space-y-4 max-w-2xl mx-auto">
//             {posts.map((post, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-sm border p-4 flex gap-4"
//               >
//                 <img
//                   src={post.user?.avatar || "https://i.pravatar.cc/100"}
//                   alt={post.user?.name}
//                   className="w-12 h-12 rounded-full border"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-center">
//                     <h4 className="font-semibold">{post.user?.name}</h4>
//                     <span className="text-xs text-gray-500">
//                       {new Date(post.createdAt).toLocaleString()}
//                     </span>
//                   </div>
//                   <p className="text-sm mt-1">{post.text}</p>
//                   {post.image && (
//                     <img
//                       src={`http://localhost:5000${post.image}`}
//                       alt="post"
//                       className="mt-3 rounded-md border max-h-60"
//                     />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function SidebarContent({
//   user,
//   newPost,
//   setNewPost,
//   handlePostSubmit,
//   handleImageChange,
//   imageFile,
// }) {
//   return (
//     <div>
//       <div className="text-center">
//         <img
//           src={user.avatar}
//           alt={user.name}
//           className="w-20 h-20 mx-auto rounded-full border-2 border-yellow-500"
//         />
//         <h3 className="mt-2 font-semibold">{user.name}</h3>
//         <p className="text-sm text-gray-500">{user.email}</p>
//       </div>

//       <nav className="mt-6 flex flex-col gap-3 text-sm">
//         <a href="#" className="hover:underline">📄 My Applications</a>
//         <a href="#" className="hover:underline">⭐ Saved Jobs</a>
//         <a href="#" className="hover:underline">🧾 My Posts</a>
//         <a href="#" className="text-red-600 hover:underline">🚪 Logout</a>
//       </nav>

//       <div className="mt-6">
//         <h4 className="font-semibold text-sm mb-2">Share Something</h4>
//         <textarea
//           rows="3"
//           className="w-full border p-2 text-sm rounded resize-none"
//           placeholder="Write a post..."
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="text-sm mt-1"
//         />
//         {imageFile && (
//           <img
//             src={URL.createObjectURL(imageFile)}
//             alt="preview"
//             className="mt-2 rounded border"
//           />
//         )}
//         <button
//           className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 w-full rounded text-sm"
//           onClick={handlePostSubmit}
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const HomePage = () => {
  return (
    <div className='mt-40 display-flex justify-center items-center text-3xl font-bold text-gray-700'>
      home
    </div>
  )
}

export default HomePage
