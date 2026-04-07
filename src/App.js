import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import MainWelcome from './pages/Home/MainWelcome';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import RegisterRole from './pages/Auth/RegisterRole';
import RegisterRestaurant from './pages/Registration/RegisterRestaurant';
import RegisterCharity from './pages/Registration/RegisterCharity';

import AdminDashboard from './pages/Administrator/AdminDashboard';
import PendingApprovals from './pages/Administrator/PendingApprovals';
import SafetyMonitor from './pages/Administrator/SafetyMonitor';
import UserManagement from './pages/Administrator/UserManagement';
import AdminSettings from './pages/Administrator/AdminSettings';

import RestaurantDashboard from './pages/Restaurant/RestaurantDashboard';
import AddFoodListing from './pages/Restaurant/AddFoodListing';
import MyListings from './pages/Restaurant/MyListings';
import CharityRequests from './pages/Restaurant/CharityRequests';
import PickupConfirmation from './pages/Restaurant/PickupConfirmation';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<MainWelcome />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/register-role" element={<RegisterRole />} />
            <Route path="/register-restaurant" element={<RegisterRestaurant />} />
            <Route path="/register-charity" element={<RegisterCharity />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/pending-approvals" element={<PendingApprovals />} />
            <Route path="/admin/safety-monitor" element={<SafetyMonitor />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/add-food" element={<AddFoodListing />} />
            <Route path="/restaurant/my-listings" element={<MyListings />} />
            <Route path="/restaurant/requests" element={<CharityRequests />} />
            <Route path="/restaurant/pickup-confirm" element={<PickupConfirmation />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;