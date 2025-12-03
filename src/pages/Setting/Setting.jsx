// Settings.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Settings = () => {
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
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Settings</h1>
          </div>
        </div>

        {/* Settings List */}
        <div className="bg-white mt-1">
          {/* Discovery Settings */}
          <div className="border-b border-gray-200 p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              Discovery Settings
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Age, distance, gender preference, etc.
            </p>
          </div>

          {/* Notification Settings */}
          <div className="border-b border-gray-200 p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              Notification Settings
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Control push and in-app notifications.
            </p>
          </div>

          {/* App Theme */}
          <div className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              App Theme
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Light / Dark (future option)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;