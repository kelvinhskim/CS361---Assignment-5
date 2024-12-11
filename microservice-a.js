const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Error handling middleware for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ error: 'Invalid JSON input. Please check the format.' });
  }
  next();
});

// In-memory storage for notifications
const notifications = [];

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Microservice A (Notification Service) is running.',
  });
});

// Endpoint to add a notification
app.post('/notifications', (req, res) => {
  console.log('POST /notifications received:', req.body);

  const { user_id, message, date } = req.body;

  // Validate the incoming data
  if (!user_id || !message || !date) {
    return res.status(400).json({ error: 'All fields (user_id, message, date) are required.' });
  }

  // Add the notification to in-memory storage
  const newNotification = {
    _id: `${notifications.length + 1}`, // Generate a simple unique ID
    user_id,
    message,
    date,
  };

  notifications.push(newNotification);
  console.log('Updated Notifications Storage:', notifications); // Log the storage

  res.status(201).json({
    status: 'success',
    message: 'Notification added successfully.',
    notification: newNotification,
  });
});

// Endpoint to fetch notifications for a user
app.get('/notifications', (req, res) => {
  const { userId } = req.query;

  console.log('GET /notifications for userId:', userId);
  console.log('Current Notifications Storage:', notifications);


  const userNotifications = notifications.filter(
    (notification) => String(notification.user_id) === String(userId)
  );

  console.log('Filtered Notifications for userId:', userNotifications);
  res.status(200).json(userNotifications);
});

// Mock Endpoint for Notification Service Status
app.get('/Notification-service-status', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Microservice A (Notification Service) is running.',
  });
});

// Start the Notification Service
app.listen(PORT, () => {
  console.log(`Notification Service running at http://localhost:${PORT}`);
});

