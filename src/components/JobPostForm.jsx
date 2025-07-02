// src/components/AdminDashboard/JobPostForm.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "Full-time",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Job posted successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          salary: "",
          jobType: "Full-time",
        });
      } else {
        toast.error(data.message || "Failed to post job");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded shadow mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Post a New Job Vacancy</h2>

      <label className="block mb-2 font-medium">Job Title</label>
      <input
        type="text"
        required
        className="w-full border p-2 mb-4 rounded"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <label className="block mb-2 font-medium">Job Description</label>
      <textarea
        required
        className="w-full border p-2 mb-4 rounded"
        rows={5}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <label className="block mb-2 font-medium">Location</label>
      <input
        type="text"
        className="w-full border p-2 mb-4 rounded"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />

      <label className="block mb-2 font-medium">Salary</label>
      <input
        type="text"
        className="w-full border p-2 mb-4 rounded"
        value={formData.salary}
        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
      />

      <label className="block mb-2 font-medium">Job Type</label>
      <select
        className="w-full border p-2 mb-6 rounded"
        value={formData.jobType}
        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
      >
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
        <option>Internship</option>
      </select>

      <button
        type="submit"
        className="w-full py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
      >
        Post Job
      </button>
    </form>
  );
}
