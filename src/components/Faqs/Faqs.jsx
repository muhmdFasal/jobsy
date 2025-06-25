// src/components/Faqs/Faqs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Faqs = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">1. How do I apply for jobs?</h2>
            <p>You can apply directly by signing in and clicking on the "Apply" button on any job listing.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">2. How can I reset my password?</h2>
            <p>Click on “Forgot Password” on the login page and follow the instructions.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">3. What are the subscription plans?</h2>
            <p>We offer both free and premium subscriptions. Premium includes additional features like recruiter visibility and profile boosts.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">4. How can I contact support?</h2>
            <p>You can reach out via email at support@jobsy.com or call 1800-123-4567.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">5. Is my data safe on Jobsy?</h2>
            <p>Yes, we follow industry-standard practices to ensure your data is secure and confidential.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
