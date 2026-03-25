import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainWelcome from './pages/MainWelcome';
import RegisterRole from './pages/RegisterRole';

const Login = () => <div style={{padding: '50px'}}>Login Page...</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<MainWelcome />} />
          
          {/* Role Selection Page */}
          <Route path="/register-role" element={<RegisterRole />} />
          
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;