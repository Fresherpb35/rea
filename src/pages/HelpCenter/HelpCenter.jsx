// HelpCenter.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/myprofile');
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center p-4 md:p-6">
            <button 
              onClick={goBack}
              className="mr-4 text-pink-600 hover:text-pink-700 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Help Center</h1>
          </div>
        </div>

        {/* Help List */}
        <div className="bg-white mt-1">
          {/* FAQ */}
          <div className="border-b border-gray-200 p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              FAQ
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Answers to common questions.
            </p>
          </div>

          {/* Contact Support */}
          <div className="border-b border-gray-200 p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              Contact Support
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Mail / Chat support (future integration).
            </p>
          </div>

          {/* App Tips */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              App Tips
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              How to get better matches & responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;