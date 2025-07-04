import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Calendar, Building, Search, IndianRupee, Filter, ChevronLeft, ChevronRight } from "lucide-react"; //for icons

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ location: "", jobType: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs/active");
      const data = await res.json();
      if (res.ok) setJobs(data);
      else toast.error(data.message || "Failed to fetch jobs");
    } catch {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login required to apply");

    try {
      const res = await fetch(`http://localhost:5000/api/applications/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (res.ok) toast.success("Application submitted!");
      else toast.error(data.message || "Failed to apply");
    } catch {
      toast.error("Network error");
    }
  };

  // Filters and pagination
  const filteredJobs = jobs.filter(
    (job) =>
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (filters.jobType === "" || job.jobType === filters.jobType)
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfLastJob - jobsPerPage, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const getJobTypeColor = (jobType) => {
    const colors = {
      'Full-time': 'bg-green-100 text-green-800',
      'Part-time': 'bg-blue-100 text-blue-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Contract': 'bg-orange-100 text-orange-800'
    };
    return colors[jobType] || 'bg-gray-100 text-gray-800';
  };

  const getDaysUntilExpiry = (expiresAt) => {
    const today = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing opportunities from top companies. Start your career journey today.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Jobs</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by location..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <select
                value={filters.jobType}
                onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
          
          {/* Results Counter */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {currentJobs.length} of {filteredJobs.length} jobs
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {currentJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            currentJobs.map((job) => {
              const daysLeft = getDaysUntilExpiry(job.expiresAt);
              return (
                <div key={job._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                            <p className="text-gray-600 font-medium">{job.company?.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
                            {job.jobType}
                          </span>
                          
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {daysLeft > 0 ? `${daysLeft} days left` : 'Expires today'}
                            </span>
                          </div>
                        </div>

                        {job.salary && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="bg-green-100 p-1 rounded">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-green-700 font-semibold">{job.salary} LPA</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleApply(job._id)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          Apply Now
                        </button>
                        
                        {daysLeft <= 3 && daysLeft > 0 && (
                          <div className="text-center">
                            <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">
                              Expires soon!
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}