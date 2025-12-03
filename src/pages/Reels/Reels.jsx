import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Grid, MessageCircle, User, Plus, Heart, MessageSquare, Share2, Volume2, VolumeX, Pause, Play, X, Send } from 'lucide-react';

// Add Reel Modal
const AddReelModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (title && selectedFile) {
      console.log('Creating reel:', { title, hashtag, file: selectedFile });
      alert('Reel created successfully!');
      onClose();
      setTitle('');
      setHashtag('');
      setSelectedFile(null);
      setPreview(null);
    } else {
      alert('Please fill all fields and select a video/image');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Create New Reel</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Video/Image</label>
            <input
              type="file"
              accept="video/*,image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
            />
            {preview && (
              <div className="mt-4 rounded-lg overflow-hidden">
                {selectedFile?.type.startsWith('image') ? (
                  <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
                ) : (
                  <video src={preview} className="w-full h-64 object-cover" controls />
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter reel title"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Hashtag */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hashtags</label>
            <input
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              placeholder="#fun #amazing"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-full font-semibold text-lg transition-colors"
          >
            Create Reel
          </button>
        </div>
      </div>
    </div>
  );
};

// Comment Modal
const CommentModal = ({ isOpen, onClose, reel }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, username: 'user123', text: 'Amazing content!', time: '2h ago' },
    { id: 2, username: 'coolperson', text: 'Love this! 😍', time: '5h ago' },
  ]);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        { id: Date.now(), username: 'You', text: comment, time: 'Just now' },
        ...comments
      ]);
      setComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center lg:justify-center">
      <div className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-lg h-[80vh] lg:h-[70vh] flex flex-col">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Comments</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-sm">{c.username[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{c.username}</span>
                  <span className="text-xs text-gray-500">{c.time}</span>
                </div>
                <p className="text-gray-700">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4 flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full focus:border-pink-500 focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full transition-colors"
          >
            <Send className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReelVideo = ({ reel, isActive, onLike, onComment, onShare }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(reel.id);
  };

  return (
    <div 
      className="relative w-full h-full bg-linear-to-br from-orange-300 via-orange-400 to-yellow-400 rounded-3xl overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlayPause}
    >
      {/* Video or Background */}
      {reel.video ? (
        <video
          ref={videoRef}
          src={reel.video}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted={isMuted}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={reel.thumbnail || "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=800&fit=crop"} 
            alt={reel.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Play/Pause Overlay */}
      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
          <button className="bg-white/30 backdrop-blur-sm p-4 rounded-full">
            {isPlaying ? <Pause size={40} className="text-white" /> : <Play size={40} className="text-white" />}
          </button>
        </div>
      )}

      {/* linear Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-0 right-0 px-6 text-white pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm opacity-90">@</span>
          <span className="text-sm opacity-90">{reel.username}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">{reel.title}</h3>
        <p className="text-base opacity-90">{reel.hashtag}</p>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-5 pointer-events-auto">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-14 h-14 ${isLiked ? 'bg-pink-500' : 'bg-white/20'} backdrop-blur-md rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors`}>
            <Heart className={`${isLiked ? 'text-white fill-white' : 'text-white'}`} size={26} />
          </div>
          <span className="text-white text-xs font-semibold">{reel.likes}</span>
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onComment();
          }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <MessageSquare className="text-white" size={26} />
          </div>
          <span className="text-white text-xs font-semibold">{reel.comments}</span>
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Share2 className="text-white" size={26} />
          </div>
          <span className="text-white text-xs font-semibold">Share</span>
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            {isMuted ? <VolumeX className="text-white" size={26} /> : <Volume2 className="text-white" size={26} />}
          </div>
        </button>
      </div>
    </div>
  );
};

const ReelsPage = () => {
  const navigate = useNavigate();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);

  const reels = [
    {
      id: 1,
      username: 'john_doe',
      title: 'My new reel',
      hashtag: '#fun',
      likes: '1.2K',
      comments: '234',
      thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=800&fit=crop'
    },
    {
      id: 2,
      username: 'jane_smith',
      title: 'Amazing sunset',
      hashtag: '#nature #beauty',
      likes: '2.5K',
      comments: '456',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop'
    },
    {
      id: 3,
      username: 'travel_lover',
      title: 'Best vacation ever',
      hashtag: '#travel #vacation',
      likes: '3.8K',
      comments: '678',
      thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=800&fit=crop'
    },
    {
      id: 4,
      username: 'food_explorer',
      title: 'Delicious meal',
      hashtag: '#foodie #yummy',
      likes: '1.9K',
      comments: '321',
      thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=800&fit=crop'
    },
  ];

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentReelIndex((prev) => (prev + 1) % reels.length);
      } else {
        setCurrentReelIndex((prev) => (prev - 1 + reels.length) % reels.length);
      }
    }
  };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > 30) {
      if (e.deltaY > 0) {
        setCurrentReelIndex((prev) => (prev + 1) % reels.length);
      } else {
        setCurrentReelIndex((prev) => (prev - 1 + reels.length) % reels.length);
      }
    }
  };

  const handleLike = (reelId) => {
    console.log('Liked reel:', reelId);
  };

  const handleComment = () => {
    setShowCommentModal(true);
  };

  const handleShare = () => {
    console.log('Share reel');
    alert('Share functionality - Copy link or share to social media');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 flex">
      {/* Left Sidebar Navigation - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white shadow-lg z-40">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Ruready</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors text-left group"
          >
            <Home size={24} className="text-gray-600 group-hover:text-pink-500" />
            <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500">Home</span>
          </button>

          <button
            onClick={() => navigate('/reels')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-pink-50 transition-colors text-left"
          >
            <Grid size={24} className="text-pink-500" />
            <span className="text-pink-500 font-semibold text-lg">Reels</span>
          </button>

          <button
            onClick={() => navigate('/userList')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors text-left group"
          >
            <MessageCircle size={24} className="text-gray-600 group-hover:text-pink-500" />
            <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500">Chat</span>
          </button>

          <button
            onClick={() => navigate('/myprofile')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors text-left group"
          >
            <User size={24} className="text-gray-600 group-hover:text-pink-500" />
            <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500">Profile</span>
          </button>
        </nav>

        <div className="p-4 m-4 bg-linear-to-br from-pink-500 to-purple-500 rounded-xl text-white">
          <h3 className="font-bold mb-2">Go Premium</h3>
          <p className="text-sm mb-3 opacity-90">Unlock all features!</p>
          <button
            onClick={() => navigate('/premium')}
            className="w-full bg-white text-pink-500 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Upgrade
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:hidden bg-linear-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h1 className="text-2xl font-bold text-pink-500">R U Ready</h1>
            </div>

            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 p-3 rounded-full shadow-lg transition-all hover:scale-105"
            >
              <Plus className="text-white" size={24} />
            </button>
          </div>
        </header>

        {/* Reels Container with Margin */}
        <main 
          ref={containerRef}
          className="flex-1 overflow-hidden p-4 lg:p-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div 
            className="h-full transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateY(-${currentReelIndex * 100}%)`,
            }}
          >
            {reels.map((reel, index) => (
              <div key={reel.id} className="h-full pb-4 lg:pb-8">
                <div className="h-full max-w-md mx-auto">
                  <ReelVideo 
                    reel={reel} 
                    isActive={index === currentReelIndex}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Scroll Indicator (Desktop) */}
        <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-30">
          <div className="flex flex-col gap-2">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReelIndex(index)}
                className={`w-2 rounded-full transition-all ${
                  index === currentReelIndex 
                    ? 'bg-pink-500 h-8' 
                    : 'bg-gray-300 hover:bg-gray-400 h-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden bg-pink-500 shadow-lg fixed bottom-0 left-0 right-0 z-40">
        <div className="flex justify-around items-center py-3">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex flex-col items-center gap-1 text-white/60"
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => navigate('/reels')} 
            className="flex flex-col items-center gap-1 text-white"
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
            onClick={() => navigate('/myprofile')} 
            className="flex flex-col items-center gap-1 text-white/60"
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <AddReelModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      <CommentModal 
        isOpen={showCommentModal} 
        onClose={() => setShowCommentModal(false)}
        reel={reels[currentReelIndex]}
      />
    </div>
  );
};

export default ReelsPage;