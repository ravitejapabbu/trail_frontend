import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import logo2 from '../assets/animations/github.png';
import logo3 from '../assets/animations/linkedin.png';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="header">
        <div className="header-logo">Trail</div>
        <div className="header-actions">
          <a href="/dashboard" className="explore-link">Dashboard</a>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-card">
        <h2>Profile</h2>
        {user ? (
          <>
            <div className="profile-detail">
              <strong>Name:</strong> {user.displayName || 'Anonymous User'}
            </div>
            <div className="profile-detail">
              <strong>Email:</strong> {user.email}
            </div>

            <h3 className="connect-title">Connect Accounts</h3>
            <div className="connect-logos">
              <img src={logo2} alt="GitHub" className="connect-logo" />
              <img src={logo3} alt="LinkedIn" className="connect-logo" />
            </div>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
