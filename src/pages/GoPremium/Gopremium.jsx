// GoPremium.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Zap, Star, Eye, MessageSquare, Heart } from 'lucide-react';

const GoPremium = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('3months');

  const goBack = () => {
    navigate('/myprofile');
  };

  const features = [
    { icon: Zap, text: 'Unlimited Likes', color: 'text-pink-600' },
    { icon: Star, text: 'Profile Boost', color: 'text-pink-600' },
    { icon: Eye, text: 'See Who Likes You', color: 'text-pink-600' },
    { icon: MessageSquare, text: 'Unlimited Messages', color: 'text-pink-600' },
    { icon: Heart, text: 'Higher Match Rate', color: 'text-pink-600' },
  ];

  const plans = [
    { id: '1month', title: '1 Month Plan', price: '₹199', period: 'month', badge: null },
    { id: '3months', title: '3 Months Plan', price: '₹499', period: 'quarter', badge: 'BEST VALUE' },
    { id: '12months', title: '12 Months Plan', price: '₹999', period: 'year', badge: null },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-pink-100 to-purple-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="flex items-center p-4 md:p-6">
            <button 
              onClick={goBack}
              className="mr-4 text-pink-600 hover:text-pink-700 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">Go Premium</h1>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Premium Hero Card */}
          <div className="bg-linear-to-br from-pink-500 to-pink-600 rounded-3xl p-8 md:p-10 text-white shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9.5 8.5L3 9.5L7.5 14L6.5 20.5L12 17L17.5 20.5L16.5 14L21 9.5L14.5 8.5L12 2Z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Upgrade to Premium</h2>
            <p className="text-center text-pink-100 text-base md:text-lg">
              Get noticed. Get matched. Get more love 💕
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mr-4">
                    <feature.icon className={feature.color} size={24} />
                  </div>
                  <span className="text-lg md:text-xl font-semibold text-gray-800">
                    {feature.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="space-y-4 pt-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'border-3 border-pink-600 shadow-xl scale-[1.02]'
                    : 'border-2 border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-6">
                    <span className="bg-linear-to-r from-pink-500 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-pink-600 text-lg md:text-xl font-semibold">
                      {plan.price} <span className="text-gray-500 font-normal">/ {plan.period}</span>
                    </p>
                  </div>
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id 
                        ? 'border-pink-600 bg-pink-600' 
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedPlan === plan.id && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade Button */}
          <div className="sticky bottom-0 pb-6 pt-4">
            <button 
              onClick={() => {
                // Handle upgrade logic here
                console.log('Selected plan:', selectedPlan);
              }}
              className="w-full bg-linear-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-xl md:text-2xl font-bold py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoPremium;