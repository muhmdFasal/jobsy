import React, { useState, useEffect } from 'react';
import { User, Calendar, Download, Mail, Phone, Search, RefreshCw, AlertCircle, Users } from 'lucide-react';

const CompanyApplicantsView = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobId, setJobId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock API base URL - replace with your actual API URL
  const API_BASE = 'http://localhost:5000/api';

  // Get auth token from localStorage
  const getAuthToken = () => {
    // Try different possible token key names
    const token = localStorage.getItem('token');
    
    console.log('Retrieved token:', token ? 'Token found' : 'No token found');
    return token;
  };

  // API headers with auth
  const getHeaders = () => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    console.log('Request headers:', headers);
    return headers;
  };

  // Fetch applicants for a specific job
  const fetchApplicants = async (selectedJobId) => {
    if (!selectedJobId) {
      setError('Please enter a Job ID');
      return;
    }

    // Check if user is authenticated
    const token = getAuthToken();
    if (!token) {
      setError('Authentication required - Please login first');
      return;
    }

    setLoading(true);
    setError('');
    setApplicants([]);
    
    try {
      const url = `${API_BASE}/applications/job/${selectedJobId}/applicants`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        
        if (response.status === 404) {
          throw new Error('Job not found');
        } else if (response.status === 403) {
          throw new Error('Unauthorized - You can only view applicants for your own jobs');
        } else if (response.status === 401) {
          throw new Error('Authentication failed - Please check your login credentials');
        } else {
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      setApplicants(data);
      
      if (data.length === 0) {
        setError('No applicants found for this job');
      }
    } catch (err) {
      console.error('Detailed error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (jobId.trim()) {
      fetchApplicants(jobId.trim());
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    if (jobId.trim()) {
      fetchApplicants(jobId.trim());
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter applicants based on search term
  const filteredApplicants = applicants.filter(applicant => 
    applicant.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.user?.mobile?.includes(searchTerm)
  );

  // Handle key press for job ID input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applicants</h1>
        <p className="text-gray-600">View and manage applicants for your job postings</p>
      </div>

      {/* Debug Info */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <h3 className="font-medium text-yellow-800 mb-2">Debug Information:</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>API URL:</strong> {API_BASE}</p>
            <p><strong>Auth Token:</strong> {getAuthToken() ? 'Present' : 'Missing'}</p>
            <p><strong>Token Preview:</strong> {getAuthToken() ? `${getAuthToken().substring(0, 20)}...` : 'None'}</p>
          </div>
        </div>
      )} */}

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job ID
            </label>
            <input
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Job ID to view applicants"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 pt-6">
            <button
              onClick={handleSearch}
              disabled={loading || !jobId.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              {loading ? 'Loading...' : 'Search'}
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading || !jobId.trim()}
              className="bg-gray-600 text-white px-4 py-3 rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Applicants Filter */}
      {applicants.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">
                {filteredApplicants.length} of {applicants.length} applicants
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or mobile..."
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applicants...</p>
        </div>
      )}

      {/* Applicants List */}
      {!loading && filteredApplicants.length > 0 && (
        <div className="grid gap-4">
          {filteredApplicants.map((applicant, index) => (
            <div key={applicant._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {applicant.user?.name || 'Name Not Available'}
                    </h3>
                    <p className="text-gray-600 text-sm">Application #{index + 1}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Applied: {formatDate(applicant.appliedAt)}
                  </p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">
                    {applicant.user?.email || 'Email Not Available'}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">
                    {applicant.user?.mobile || 'Mobile Not Available'}
                  </span>
                </div>
              </div>

              {/* Application Details */}
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Application ID:</span>
                    <span className="text-gray-600 ml-2">{applicant._id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Job ID:</span>
                    <span className="text-gray-600 ml-2">{applicant.job}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  Candidate Profile
                </div>
                <div className="flex gap-2">
                  <a
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </a>
                  <a
                    href={`mailto:${applicant.user?.email}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center text-sm"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Applicants State */}
      {!loading && applicants.length === 0 && jobId && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants yet</h3>
          <p className="text-gray-600">No one has applied to this job posting yet.</p>
        </div>
      )}

      {/* No Search Results */}
      {!loading && applicants.length > 0 && filteredApplicants.length === 0 && searchTerm && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matching applicants</h3>
          <p className="text-gray-600">Try adjusting your search terms.</p>
        </div>
      )}

      {/* Initial State */}
      {!loading && applicants.length === 0 && !jobId && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Find Job Applicants</h3>
          <p className="text-gray-600">Enter a Job ID above to view applicants for that position.</p>
        </div>
      )}
    </div>
  );
};

export default CompanyApplicantsView;