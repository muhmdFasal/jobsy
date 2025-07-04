import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Calendar, Building, Search, IndianRupee, Filter, ChevronLeft, ChevronRight, Upload, X, FileText, User } from "lucide-react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ location: "", jobType: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
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

  
  
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUserInfo({ name: data.name, email: data.email });
      }
    } catch {
      // Silent fail for user info
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchUserInfo();
  }, []);

  const handleApplyClick = (job) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login required to apply");
    
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const res = await fetch(`http://localhost:5000/api/applications/apply/${selectedJob._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success("Application submitted successfully!");
        setShowApplicationModal(false);
        setResumeFile(null);
        setSelectedJob(null);
      } else {
        toast.error(data.message || "Failed to submit application");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      setResumeFile(file);
    }
  };

  const closeModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
    setResumeFile(null);
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

   useEffect(() => {
    fetchJobs();

    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        setUserInfo({ name: parsed.name, email: parsed.email });
      } catch (e) {
        console.error("Failed to parse user info from localStorage", e);
      }
    }
  }, []);


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
                          onClick={() => handleApplyClick(job)}
                          className="px-6 cursor-pointer py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apply for Job</h2>
                <button
                  onClick={closeModal}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Job Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedJob.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedJob.company?.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedJob.location}</span>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                {/* User Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userInfo.name}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Upload Resume *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-gray-500">
                        PDF, DOC, DOCX (max 5MB)
                      </span>
                    </label>
                  </div>
                  
                  {resumeFile && (
                    <div className="mt-2 p-2 bg-green-50 rounded-lg flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-800">{resumeFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="ml-auto cursor-pointer text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!resumeFile || isSubmitting}
                    className="flex-1 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


