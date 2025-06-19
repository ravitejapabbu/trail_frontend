import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo2 from '../assets/animations/github.png';
import logo3 from '../assets/animations/linkedin.png';
import exploreIcon from '../assets/animations/explore.png';

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const loginWithGithub = async () => {
    try {
      const res = await fetch('http://localhost:5000/login/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login' }),
      });
      const data = await res.json();
      alert("GitHub login: " + data.message);
    } catch (error) {
      console.error(error);
      alert("GitHub login failed");
    }
  };

  const loginWithLinkedIn = async () => {
    try {
      const res = await fetch('http://localhost:5000/login/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login' }),
      });
      const data = await res.json();
      alert("LinkedIn login: " + data.message);
    } catch (error) {
      console.error(error);
      alert("LinkedIn login failed");
    }
  };

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessages = [
      ...messages,
      { type: "user", text: input },
      { type: "bot", text: `You said: "${input}" 👋` }
    ];
    setMessages(newMessages);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="homepage">
      <div className="header">
        <div className="header-logo">Trail</div>
        <div className="header-actions">
          <a href="/explore" className="explore-link">
            <img src={exploreIcon} alt="Explore" className="explore-icon" />
            Explore
          </a>
          <div className="hamburger" onClick={toggleSidebar}>
            &#9776;
          </div>
        </div>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a onClick={() => navigate('/profile')}>Profile</a>
        <a onClick={handleLogout}>Logout</a>
      </div>

      <div className={`overlay ${sidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>

      <div className="homepage-description">
        <p>
          Welcome to Trail, Connect Trail with Your Favourite Learning, Practicing and Socializing Platform
        </p>
      </div>

      <div className="logo-container">
        <div className="logo-item" onClick={loginWithGithub}>
          <img src={logo2} alt="GitHub" />
          <p>GitHub</p>
        </div>
        <div className="logo-item" onClick={loginWithLinkedIn}>
          <img src={logo3} alt="LinkedIn" />
          <p>LinkedIn</p>
        </div>
      </div>

      <div className="chatbox-compact">
        <div className="chatbox-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.type === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chatbox-input">
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
