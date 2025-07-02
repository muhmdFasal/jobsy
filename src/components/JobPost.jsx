// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const JobPost = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     salary: "",
//     type: "Full-time",
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/jobs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("✅ Job posted successfully");
//         setTimeout(() => navigate("/feed/jobs"), 1200);
//       } else {
//         toast.error(data.message || "Failed to post job");
//       }
//     } catch (err) {
//       toast.error("Error posting job");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <Toaster />
//       <h2 className="text-2xl font-semibold mb-4">📢 Post a New Job</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
//         <input
//           type="text"
//           name="title"
//           placeholder="Job Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Job Description"
//           value={formData.description}
//           onChange={handleChange}
//           rows={4}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="salary"
//           placeholder="Salary"
//           value={formData.salary}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <select
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="Full-time">Full-time</option>
//           <option value="Part-time">Part-time</option>
//           <option value="Internship">Internship</option>
//           <option value="Contract">Contract</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Post Job
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JobPost;
