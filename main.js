const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const MICROSERVICE_B_URL = process.env.MICROSERVICE_B_URL || 'http://localhost:3002';
const MICROSERVICE_C_URL = process.env.MICROSERVICE_C_URL || 'http://localhost:3003';
const MICROSERVICE_D_URL = process.env.MICROSERVICE_D_URL || 'http://localhost:3004';

app.use(cors());
app.use(express.json());

const notifications = []; // In-memory storage for notifications

// Fetch pet profiles
app.get('/pets', async (req, res) => {
    try {
        const response = await axios.get(`${MICROSERVICE_B_URL}/pets`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pet profiles' });
    }
});

// Fetch appointments
app.get('/appointments', async (req, res) => {
    try {
        const response = await axios.get(`${MICROSERVICE_C_URL}/appointments`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Fetch routine tasks
app.get('/routine-tasks', async (req, res) => {
    try {
        const response = await axios.get(`${MICROSERVICE_D_URL}/routine-tasks`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch routine tasks' });
    }
});

// Receive notifications
app.post('/notify', (req, res) => {
    const { user_id, message } = req.body;
    if (!user_id || !message) {
        return res.status(400).json({ error: 'Invalid notification payload.' });
    }
    notifications.push({ user_id, message, timestamp: new Date() });
    console.log('Notification received:', { user_id, message });
    res.status(200).json({ status: 'success', message: 'Notification received.' });
});

// Fetch notifications
app.get('/notifications', (req, res) => {
    if (notifications.length > 0) {
        res.status(200).json(notifications);
    } else {
        res.status(200).json({ message: 'No notifications available', notifications: [] });
    }
});

// Health check
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Main Program is running.',
        availableEndpoints: [
            { method: 'GET', path: '/pets', description: 'Fetch pet profiles from Microservice B' },
            { method: 'GET', path: '/appointments', description: 'Fetch appointments from Microservice C' },
            { method: 'GET', path: '/routine-tasks', description: 'Fetch routine tasks from Microservice D' },
            { method: 'POST', path: '/notify', description: 'Receive notifications from Microservice A' },
            { method: 'GET', path: '/notifications', description: 'Fetch notifications' },
        ],
    });
});

app.listen(PORT, () => {
    console.log(`Main Program running at http://localhost:${PORT}`);
});
