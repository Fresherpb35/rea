import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from '../pages/Dashboard/Dashboard';
import ForgotPassword from '../pages/Fogot-Password/Forgot-Password';
import UsersListPage from '../pages/Users-List/Users-List';
import MyProfile from '../pages/MyProfile/MyProfile';
import Reels from '../pages/Reels/Reels';
import Settings from '../pages/Setting/Setting';
import PrivacySafety from '../pages/PrivacySafety/PrivacySafety';
import HelpCenter from '../pages/HelpCenter/HelpCenter';
import GoPremium from '../pages/GoPremium/Gopremium';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/userList" element={<ProtectedRoute><UsersListPage /></ProtectedRoute>} />
        <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/reels" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
        <Route path="/setting" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/privacysafety" element={<ProtectedRoute><PrivacySafety /></ProtectedRoute>} />
        <Route path="/helpcenter" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
        <Route path="/gopremium" element={<ProtectedRoute><GoPremium /></ProtectedRoute>} />
        <Route path="/premium" element={<ProtectedRoute><GoPremium /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;