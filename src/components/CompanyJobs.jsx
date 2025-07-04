import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs/my-jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      toast.error('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to post job');

      toast.success('Job posted successfully');
      setForm({ title: '', description: '', location: '', salary: '' });
      fetchJobs();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Post a New Job</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="col-span-1 md:col-span-2 border p-3 rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Salary (e.g. 5-7 LPA)"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            className="border p-3 rounded-lg"
          />

          <textarea
            placeholder="Job Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="col-span-1 md:col-span-2 border p-3 rounded-lg resize-none h-32"
            required
          ></textarea>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
          >
            Post Job
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Your Posted Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded-lg shadow border">
                <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.location} • {job.salary}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyJobs;