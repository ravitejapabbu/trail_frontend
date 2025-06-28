import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import logo2 from '../assets/animations/github.png';
import logo3 from '../assets/animations/linkedin.png';
import exploreIcon from '../assets/animations/explore.png';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [githubUser, setGithubUser] = useState("");
  const [linkedinUser, setLinkedinUser] = useState("");
  const [activityData, setActivityData] = useState([]);

  const messagesEndRef = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const LINKEDIN_CLIENT_ID = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
  const LINKEDIN_REDIRECT_URI = process.env.REACT_APP_LINKEDIN_REDIRECT_URI;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const loginWithGithub = () => {
    window.location.href = `${BASE_URL}/github/login`;
  };

  const loginWithLinkedIn = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${LINKEDIN_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}` +
      `&scope=openid%20profile`;
    window.location.href = authUrl;
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);

    try {
      const res = await fetch(`${BASE_URL}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botResponse = data.response;

      setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
    } catch (err) {
      console.error("Error calling chatbot API:", err);
      setMessages((prev) => [...prev, { type: "bot", text: "❌ Sorry, something went wrong." }]);
    }

    setInput("");
  };

  const fetchGithubActivity = async (username) => {
    try {
      const res = await fetch(`${BASE_URL}/analyze-github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, token: process.env.REACT_APP_GITHUB_TOKEN })
      });
      const data = await res.json();
      const dailyData = data.activity.daily;
      setActivityData(dailyData.slice(-14)); // last 14 days for graph
    } catch (err) {
      console.error("Error fetching activity data:", err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const platform = params.get('platform');

    if (username) {
      if (platform === 'LinkedIn') {
        setLinkedinUser(username);
        sessionStorage.setItem('linkedinUser', username);
      } else if (platform === 'GitHub') {
        setGithubUser(username);
        sessionStorage.setItem('githubUser', username);
        fetchGithubActivity(username);
      }

      fetch(`${BASE_URL}/save-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, platform })
      })
        .then(res => res.json())
        .then(data => console.log("User saved:", data))
        .catch(err => console.error("Error saving user:", err));
    }
  }, [location]);

  useEffect(() => {
    const savedGithub = sessionStorage.getItem('githubUser');
    const savedLinkedin = sessionStorage.getItem('linkedinUser');
    if (savedGithub) {
      setGithubUser(savedGithub);
      fetchGithubActivity(savedGithub);
    }
    if (savedLinkedin) setLinkedinUser(savedLinkedin);
  }, []);

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
      </div>

      <div className={`overlay ${sidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>

      <div className="homepage-description">
        <p>Welcome to Trail — connect your favorite learning, practicing and socializing platform.</p>
      </div>

      <div className="logo-container">
        {!githubUser && (
          <div className="login-button" onClick={loginWithGithub}>
            <img src={logo2} alt="GitHub" />
            GitHub
          </div>
        )}
        {!linkedinUser && (
          <div className="login-button" onClick={loginWithLinkedIn}>
            <img src={logo3} alt="LinkedIn" />
            LinkedIn
          </div>
        )}
        {githubUser && (
          <div className="user-badge">
            <img src={logo2} alt="GitHub" className="platform-icon" />
            <p>{githubUser}</p>
          </div>
        )}
        {linkedinUser && (
          <div className="user-badge">
            <img src={logo3} alt="LinkedIn" className="platform-icon" />
            <p>{linkedinUser}</p>
          </div>
        )}
      </div>

      {githubUser && activityData.length > 0 && (
        <div className="activity-graph">
          <h3 style={{ color: '#fff' }}>{githubUser}'s Contributions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="date" tick={{ fill: '#fff' }} />
              <YAxis tick={{ fill: '#fff' }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#00ff99" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

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
