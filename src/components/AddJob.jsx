import { useState } from "react";
import toast from "react-hot-toast";

const AddJob = ({ companyId }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
    deadline: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...form, company: companyId }),
      });

      if (!res.ok) throw new Error("Failed to post job");
      toast.success("Job posted successfully");
      setForm({
        title: "",
        description: "",
        location: "",
        salary: "",
        requirements: "",
        deadline: "",
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
      <input
        type="text"
        placeholder="Job Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="Salary"
        value={form.salary}
        onChange={(e) => setForm({ ...form, salary: e.target.value })}
      />
      <input
        type="text"
        placeholder="Requirements"
        value={form.requirements}
        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
      />
      <input
        type="date"
        value={form.deadline}
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
      />
      <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">
        Post Job
      </button>
    </form>
  );
};

export default AddJob;
