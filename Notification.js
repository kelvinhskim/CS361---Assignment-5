import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Notification.css';

const Notification = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user || !user.id) {
        console.log('No user or user ID found:', user); // Debug log
        return;
      }

      console.log('Fetching notifications for userId:', user.id); // Debug log

      try {
        const response = await axios.get('http://localhost:3001/notifications', {
          params: { userId: user.id },
        });
        console.log('Fetched Notifications:', response.data); // Debug log
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user]);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <p>{notification.message}</p>
              <p>{new Date(notification.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
