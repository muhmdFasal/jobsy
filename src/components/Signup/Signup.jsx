import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [workStatus, setWorkStatus] = useState(null);
  const [updates, setUpdates] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile, // ✅ ADD THIS LINE
        role: workStatus === 'experienced' ? 'user' : 'fresher',
      }),
    });

    const data = await response.json();
    console.log("Signup Response:", data);

    if (response.ok) {
      alert('✅ Registered successfully!');
    } else {
      alert(`❌ Error: ${data.msg || data.message || 'Registration failed.'}`);
    }
  } catch (err) {
    alert(`❌ Network error: ${err.message}`);
  }
};


  const footerLinks = [
    {
      label: 'About Us',
      content: `Jobsy is India’s leading job portal...`,
    },
    {
      label: 'Contact Us',
      content: `Email: support@jobsy.com\nPhone: 1800-123-4567\nWorking hours: Mon-Fri, 9 AM - 6 PM IST`,
    },
    {
      label: 'FAQs',
      content: (
        <>
          Frequently Asked Questions:
          <br />1. How do I apply for jobs?
          <br />2. How can I reset my password?
          <br />3. What are the subscription plans?
          <br />
          <Link to="/faqs" className="text-blue-600 underline">
            Visit our full FAQ page
          </Link>
        </>
      ),
    },
    {
      label: 'Terms and Conditions',
      content: `By using Jobsy, you agree to the terms.`,
    },
    {
      label: 'Report a Problem',
      content: `Facing any issues?\nEmail: support@jobsy.com`,
    },
    {
      label: 'Privacy Policy',
      content: `We value your privacy...`,
    },
  ];

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-1">Create your Jobsy profile</h2>
        <p className="text-sm text-gray-600 mb-6">Search & apply to jobs from India's No.1 Job Site</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Full name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="What is your name?"
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email ID <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Your email"
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="(Minimum 6 characters)"
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mobile number <span className="text-red-500">*</span></label>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">+91</span>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter your mobile number"
                className="flex-1 border border-gray-300 p-3 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Work status <span className="text-red-500">*</span></label>
            <div className="flex gap-4">
              <div
                className={`flex-1 border p-4 rounded-xl cursor-pointer ${workStatus === 'experienced' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                onClick={() => setWorkStatus('experienced')}
              >
                <strong className="block text-lg mb-1">I'm experienced</strong>
                <p className="text-sm text-gray-600">I have work experience</p>
              </div>
              <div
                className={`flex-1 border p-4 rounded-xl cursor-pointer ${workStatus === 'fresher' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                onClick={() => setWorkStatus('fresher')}
              >
                <strong className="block text-lg mb-1">I'm a fresher</strong>
                <p className="text-sm text-gray-600">I haven't worked after graduation</p>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="updates"
              checked={updates}
              onChange={() => setUpdates(!updates)}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="updates" className="text-sm text-gray-700">
              Send me updates via SMS, email, and <span className="text-green-500 font-medium">WhatsApp</span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 cursor-pointer w-full py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
          >
            Register now
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 mt-10 border-t">
        <div className="flex flex-wrap justify-center gap-4 text-blue-600 font-medium mb-2">
          {footerLinks.map(({ label, content }) => (
            <button
              key={label}
              className="hover:underline focus:outline-none"
              onClick={() => openModal(content)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">All rights reserved © 2025 Info Edge India Ltd.</p>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-white bg-opacity-80" onClick={closeModal}>
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              &#x2715;
            </button>
            <div className="whitespace-pre-line text-gray-700">
              {typeof modalContent === 'string' ? modalContent : modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;






