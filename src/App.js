import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import React from 'react';
import './global.css';
function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
