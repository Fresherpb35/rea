import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Grid, MessageCircle, User, Phone, Video, Send, Smile, Paperclip, MoreVertical, X, Image, Mic } from 'lucide-react';

const UserCard = ({ user, onSelect, isSelected }) => {
  return (
    <div 
      onClick={() => onSelect(user)}
      className={`flex items-center gap-3 p-4 hover:bg-pink-50 cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected ? 'border-pink-500 bg-pink-50' : 'border-transparent'
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md"
        />
        {user.online && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
          {user.lastMessageTime && (
            <span className="text-xs text-gray-400 shrink-0 ml-2">{user.lastMessageTime}</span>
          )}
        </div>
        <p className="text-sm text-gray-500 truncate">{user.lastMessage || user.bio}</p>
      </div>

      {/* Unread Badge */}
      {user.unread && (
        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">{user.unread}</span>
        </div>
      )}
    </div>
  );
};

const ChatBox = ({ user, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How are you?', sender: 'them', time: '10:30 AM' },
    { id: 2, text: "I'm good! What about you?", sender: 'me', time: '10:32 AM' },
    { id: 3, text: 'Doing great! Want to grab coffee sometime?', sender: 'them', time: '10:35 AM' },
    { id: 4, text: 'Sure! That sounds wonderful. When are you free?', sender: 'me', time: '10:36 AM' },
    { id: 5, text: 'How about this weekend? Saturday afternoon works for me!', sender: 'them', time: '10:38 AM' },
  ]);
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startCall = (type) => {
    setCallType(type);
    setIsInCall(true);
    setCallDuration(0);
    console.log(`Starting ${type} call with ${user.name}`);
    
    // Simulate call duration
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const endCall = () => {
    setIsInCall(false);
    setCallType(null);
    setCallDuration(0);
    console.log('Call ended');
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-linear-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={64} className="text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Chat</h2>
          <p className="text-gray-500 text-lg">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col relative">
      {/* Call Overlay */}
      {isInCall && (
        <div className="absolute inset-0 bg-linear-to-br from-pink-600 via-purple-600 to-blue-600 z-50 flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-40 h-40 rounded-full object-cover ring-8 ring-white/30 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 border-4 border-white rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">{user.name}</h2>
            <p className="text-white/90 text-xl mb-2">
              {callType === 'audio' ? '📞 Voice Call' : '📹 Video Call'}
            </p>
            <p className="text-white/70 text-2xl font-mono">{formatDuration(callDuration)}</p>
          </div>

          {/* Call Controls */}
          <div className="flex gap-8">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-6 rounded-full transition-all hover:scale-110">
              <Mic className="text-white" size={28} />
            </button>
            {callType === 'video' && (
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-6 rounded-full transition-all hover:scale-110">
                <Video className="text-white" size={28} />
              </button>
            )}
            <button 
              onClick={endCall}
              className="bg-red-500 hover:bg-red-600 p-6 rounded-full transition-all hover:scale-110 shadow-lg"
            >
              <X className="text-white" size={28} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-700" />
            </button>
            
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-200"
              />
              {user.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h2 className="font-bold text-gray-800 text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">
                {user.online ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active now
                  </span>
                ) : 'Offline'}
              </p>
            </div>
          </div>

          {/* Call Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => startCall('audio')}
              className="p-3 hover:bg-pink-50 rounded-full transition-colors text-pink-500 hover:scale-110"
              title="Voice Call"
            >
              <Phone size={22} />
            </button>
            <button 
              onClick={() => startCall('video')}
              className="p-3 hover:bg-pink-50 rounded-full transition-colors text-pink-500 hover:scale-110"
              title="Video Call"
            >
              <Video size={22} />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
              <MoreVertical size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-linear-to-b from-gray-50 to-white">
        {/* Date Separator */}
        <div className="flex items-center justify-center my-4">
          <div className="bg-gray-200 text-gray-600 text-xs px-4 py-1 rounded-full font-medium">
            Today
          </div>
        </div>

        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[75%] ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.sender === 'them' && (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-pink-100"
                />
              )}
              <div>
                <div
                  className={`px-5 py-3 rounded-2xl shadow-sm ${
                    msg.sender === 'me'
                      ? 'bg-linear-to-r from-pink-500 to-purple-500 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                </div>
                <p className={`text-xs text-gray-400 mt-1.5 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end gap-2">
          <button className="p-3 hover:bg-pink-50 rounded-full transition-colors text-pink-500 shrink-0">
            <Image size={22} />
          </button>
          
          <button className="p-3 hover:bg-pink-50 rounded-full transition-colors text-pink-500 shrink-0">
            <Paperclip size={22} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows="1"
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-3xl focus:border-pink-400 focus:outline-none resize-none text-gray-700 placeholder-gray-400"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>

          <button className="p-3 hover:bg-pink-50 rounded-full transition-colors text-pink-500 shrink-0">
            <Smile size={22} />
          </button>

          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-3.5 rounded-full transition-all shrink-0 ${
              message.trim() 
                ? 'bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const UsersListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { 
      id: 1, 
      name: 'Neeraj Kumar', 
      bio: '', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', 
      online: true,
      lastMessage: 'Hey! How are you?',
      lastMessageTime: '10:30 AM',
      unread: 3
    },
    { 
      id: 2, 
      name: 'Akash', 
      bio: 'hekelek', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', 
      online: false,
      lastMessage: 'See you tomorrow!',
      lastMessageTime: 'Yesterday'
    },
    { 
      id: 3, 
      name: 'Priya Mathur', 
      bio: 'namaste', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', 
      online: true,
      lastMessage: 'Thanks for your help!',
      lastMessageTime: '2:15 PM',
      unread: 1
    },
    { 
      id: 4, 
      name: 'Samrat Singh', 
      bio: 'Hlw boro', 
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', 
      online: true,
      lastMessage: 'Let me know when you are free',
      lastMessageTime: '11:45 AM'
    },
    { 
      id: 5, 
      name: 'Sarthak Verma', 
      bio: 'hiii', 
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', 
      online: false,
      lastMessage: 'Good night!',
      lastMessageTime: 'Monday'
    },
    { 
      id: 6, 
      name: 'Anjali Sharma', 
      bio: 'good', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', 
      online: true,
      lastMessage: 'That sounds great!',
      lastMessageTime: '9:00 AM',
      unread: 2
    },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50 flex">
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
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors text-left group"
          >
            <Grid size={24} className="text-gray-600 group-hover:text-pink-500" />
            <span className="text-gray-700 font-medium text-lg group-hover:text-pink-500">Reels</span>
          </button>

          <button
            onClick={() => navigate('/userList')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-pink-50 transition-colors text-left"
          >
            <MessageCircle size={24} className="text-pink-500" />
            <span className="text-pink-500 font-semibold text-lg">Chat</span>
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
            onClick={() => navigate('/gopremium')}
            className="w-full bg-white text-pink-500 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Upgrade
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:hidden bg-linear-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h1 className="text-2xl font-bold text-pink-500">Messages</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Users List Sidebar */}
          <div className={`${selectedUser && 'hidden lg:flex'} w-full lg:w-96 xl:w-[28rem] bg-white border-r border-gray-200 flex flex-col`}>
            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-linear-to-r from-pink-50 to-purple-50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" size={20} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors text-gray-700 bg-white"
                />
              </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onSelect={handleUserSelect}
                    isSelected={selectedUser?.id === user.id}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <User size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No conversations found</p>
                  </div>
                </div>
              )}
            </div>

            {/* User Count */}
            <div className="p-4 border-t border-gray-200 bg-linear-to-r from-pink-50 to-purple-50">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold text-pink-500">{filteredUsers.length}</span> conversation{filteredUsers.length !== 1 && 's'}
              </p>
            </div>
          </div>

          {/* Chat Box */}
          <ChatBox 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)}
          />
        </main>
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
            className="flex flex-col items-center gap-1 text-white/60"
          >
            <Grid size={24} />
            <span className="text-xs font-medium">Reels</span>
          </button>
          <button 
            onClick={() => navigate('/userList')}
            className="flex flex-col items-center gap-1 text-white"
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
    </div>
  );
};

export default UsersListPage;