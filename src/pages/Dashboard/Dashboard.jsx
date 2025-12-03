import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, RefreshCw, Home, Grid, MessageCircle, User, X, ChevronLeft, ChevronRight, Filter, Check } from 'lucide-react';

// Likes Modal Component
const LikesModal = ({ isOpen, onClose, likedProfiles }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="text-pink-500 fill-pink-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Liked Profiles</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {likedProfiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-pink-300" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Likes Yet</h3>
              <p className="text-gray-500">Start liking profiles to see them here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {likedProfiles.map((profile) => (
                <div 
                  key={profile.id}
                  className="bg-linear-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-64">
                    <img 
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
                      <p className="text-sm opacity-90">{profile.location} • {profile.gender}</p>
                      <p className="text-xs opacity-75 mt-1">{profile.age} years old</p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-pink-500 p-2 rounded-full shadow-lg">
                        <Heart className="text-white fill-white" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {likedProfiles.length > 0 && (
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
            <p className="text-center text-gray-600">
              You have liked <span className="font-bold text-pink-500">{likedProfiles.length}</span> profile{likedProfiles.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterModal = ({ isOpen, onClose, filters, onFilterChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Filters</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onFilterChange({ age: [18, 80], gender: 'Any', city: '', distance: 50 })}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RefreshCw className="text-pink-500" size={24} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Check className="text-green-500" size={28} />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Age Filter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Age</h3>
            <div className="flex justify-between mb-4 text-lg">
              <span className="text-gray-600">Min: {filters.age[0]}</span>
              <span className="text-gray-600">Max: {filters.age[1]}</span>
            </div>
            <div className="relative pt-2">
              <input
                type="range"
                min="18"
                max="80"
                value={filters.age[0]}
                onChange={(e) => onFilterChange({ ...filters, age: [parseInt(e.target.value), filters.age[1]] })}
                className="absolute w-full h-2 bg-purple-500 rounded-lg appearance-none cursor-pointer"
                style={{ zIndex: 2 }}
              />
              <input
                type="range"
                min="18"
                max="80"
                value={filters.age[1]}
                onChange={(e) => onFilterChange({ ...filters, age: [filters.age[0], parseInt(e.target.value)] })}
                className="absolute w-full h-2 bg-purple-500 rounded-lg appearance-none cursor-pointer"
                style={{ zIndex: 1 }}
              />
              <div className="w-full h-2 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Gender Filter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Gender</h3>
            <div className="flex gap-4">
              {['Any', 'Male', 'Female'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => onFilterChange({ ...filters, gender })}
                  className={`flex-1 py-4 px-6 rounded-full text-lg font-medium transition-all ${
                    filters.gender === gender
                      ? 'bg-pink-100 text-pink-600 border-2 border-pink-500'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">City</h3>
            <input
              type="text"
              placeholder="Type city"
              value={filters.city}
              onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
              className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-pink-500 outline-none text-lg"
            />
          </div>

          {/* Distance Filter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Distance (KM)</h3>
            <div className="flex justify-between mb-4 text-lg">
              <span className="text-gray-600">0 KM</span>
              <span className="text-gray-600">{filters.distance} KM</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.distance}
              onChange={(e) => onFilterChange({ ...filters, distance: parseInt(e.target.value) })}
              className="w-full h-2 bg-purple-500 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ name, location, gender, image, age, onLike, onDislike }) => {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
      {/* Profile Image */}
      <div className="absolute inset-0">
        <img 
          src={image || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1200&fit=crop"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* linear Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
      
      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-4xl font-bold mb-2">{name}</h2>
        <p className="text-lg opacity-90">{location} • {gender}</p>
      </div>

      {/* Action Buttons Overlay (Desktop) */}
      <div className="hidden lg:flex absolute bottom-8 right-8 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onDislike}
          className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-4 rounded-full transition-all duration-200 hover:scale-110"
        >
          <X className="text-white" size={32} />
        </button>
        <button
          onClick={onLike}
          className="bg-pink-500/80 backdrop-blur-md hover:bg-pink-500 p-4 rounded-full transition-all duration-200 hover:scale-110"
        >
          <Heart className="text-white" size={32} />
        </button>
      </div>
    </div>
  );
};

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState([]);

  const [filters, setFilters] = useState({
    age: [18, 80],
    gender: 'Any',
    city: '',
    distance: 50
  });

  const profiles = [
    { id: 1, name: 'Akash', location: 'Iko', gender: 'male', age: 25, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1200&fit=crop' },
    { id: 2, name: 'Priya', location: 'Mumbai', gender: 'female', age: 23, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop' },
    { id: 3, name: 'Rahul', location: 'Delhi', gender: 'male', age: 28, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop' },
    { id: 4, name: 'Ananya', location: 'Bangalore', gender: 'female', age: 26, image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop' },
  ];

  const handleLike = () => {
    const profile = profiles[currentProfile];
    
    // Check if profile is already liked
    if (!likedProfiles.find(p => p.id === profile.id)) {
      setLikedProfiles([...likedProfiles, profile]);
      console.log('Liked:', profile.name);
    }
    
    nextProfile();
  };

  const handleDislike = () => {
    console.log('Disliked:', profiles[currentProfile].name);
    nextProfile();
  };

  const nextProfile = () => {
    setCurrentProfile((prev) => (prev + 1) % profiles.length);
  };

  const prevProfile = () => {
    setCurrentProfile((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  const handleRefresh = () => {
    console.log('Refresh profiles');
    setCurrentProfile(0);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex">
      {/* Left Sidebar Navigation - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white shadow-lg z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Ruready</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-pink-50 transition-colors text-left"
          >
            <Home size={24} className="text-pink-500" />
            <span className="text-pink-500 font-semibold text-lg">Home</span>
          </button>

          <button
            onClick={() => navigate('/reels')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors text-left group"
          >
            <Grid size={24} className="text-gray-600 group-hover:text-pink-500" />
            <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500">Reels</span>
          </button>

          <button
            onClick={() => navigate('/userList')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors text-left group"
          >
            <MessageCircle size={24} className="text-gray-600 group-hover:text-pink-500" />
            <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500">Chat</span>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors text-left group"
          >
            <User size={24} className="text-gray-600 group-hover:text-pink-500" />
            <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500">Profile</span>
          </button>
        </nav>

        {/* Stats Section */}
        <div className="p-4 m-4 bg-linear-to-br from-pink-50 to-purple-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-3">Your Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Profile Views</span>
              <span className="font-semibold text-pink-500">247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Matches</span>
              <span className="font-semibold text-pink-500">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Likes Given</span>
              <span className="font-semibold text-pink-500">{likedProfiles.length}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Left: Back & Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(-1)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="text-gray-700" size={24} />
              </button>
              <h1 className="text-2xl font-bold text-pink-500">R U Ready</h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowLikes(true)}
                className="relative p-2 hover:bg-pink-50 rounded-lg transition-colors"
              >
                <Heart className="text-pink-500" size={24} />
                {likedProfiles.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{likedProfiles.length}</span>
                  </div>
                )}
              </button>
              <button 
                onClick={() => setShowFilters(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Filter className="text-gray-700" size={24} />
              </button>
              <button 
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="text-gray-700" size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          <div className="h-full flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Profile Card Container */}
              <div className="relative" style={{ aspectRatio: '3/4' }}>
                <ProfileCard
                  {...profiles[currentProfile]}
                  onLike={handleLike}
                  onDislike={handleDislike}
                />

                {/* Navigation Arrows (Desktop) */}
                <button
                  onClick={prevProfile}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="text-white" size={28} />
                </button>
                <button
                  onClick={nextProfile}
                  className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="text-white" size={28} />
                </button>
              </div>

              {/* Mobile Action Buttons */}
              <div className="lg:hidden flex justify-center gap-6 mt-6">
                <button
                  onClick={handleDislike}
                  className="bg-white hover:bg-gray-50 p-5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <X className="text-gray-700" size={32} />
                </button>
                <button
                  onClick={handleLike}
                  className="bg-pink-500 hover:bg-pink-600 p-6 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <Heart className="text-white fill-white" size={36} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden bg-pink-500 shadow-lg fixed bottom-0 left-0 right-0 z-40">
        <div className="flex justify-around items-center py-3">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex flex-col items-center gap-1 text-white"
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => navigate('/reels')} 
            className="flex flex-col items-center gap-1 text-white/60"
          >
            <Grid size={24} />
            <span className="text-xs font-medium">Reels</span>
          </button>
          <button 
            onClick={() => navigate('/userList')} 
            className="flex flex-col items-center gap-1 text-white/60"
          >
            <MessageCircle size={24} />
            <span className="text-xs font-medium">Chat</span>
          </button>
          <button 
            onClick={() => navigate('/profile')} 
            className="flex flex-col items-center gap-1 text-white/60"
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
      
      <LikesModal
        isOpen={showLikes}
        onClose={() => setShowLikes(false)}
        likedProfiles={likedProfiles}
      />
    </div>
  );
};

export default HomeDashboard;