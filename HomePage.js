import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = '12345'; // Replace with the actual logged-in user ID

  const handleLogin = () => {
    setIsLoggedIn(true);
    alert('Logged in successfully');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out successfully');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchNotifications = async () => {
        setLoading(true);
        setError(null);

        console.log('Fetching notifications for userId:', userId); // Debug log

        try {
          const response = await axios.get('http://localhost:3001/notifications', {
            params: { userId: userId },
          });
          console.log('Fetched Notifications:', response.data); // Debug log
          setNotifications(response.data);
        } catch (err) {
          setError('Failed to fetch notifications.');
          console.error('Error fetching notifications:', err); // Debug log
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [isLoggedIn, userId]);

  return (
    <div className="homepage-container">
      <h1>Welcome to Pet Care Management</h1>
      <p>Manage your pets' appointments, profiles, and routine tasks easily.</p>

      {!isLoggedIn ? (
        <div className="auth-section">
          <h3>Login to your account:</h3>
          <button onClick={handleLogin} className="login-button">Login</button>
          <h3>Or</h3>
          <Link to="/register" className="register-link">Register</Link>
        </div>
      ) : (
        <div className="dashboard-section">
          <h3>Welcome back!</h3>
          <p>Your pet management dashboard:</p>

          <Link to="/my-pet" className="my-pet-link">My Pet</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>

          <div className="notifications-section">
            <h3>Notifications</h3>
            {loading && <p>Loading notifications...</p>}
            {error && <p className="error-message">{error}</p>}
            {notifications.length === 0 && !loading && <p>No notifications available.</p>}
            {notifications.length > 0 && (
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>{notification.message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;