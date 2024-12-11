const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/petcare')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const appointmentSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  vetName: { type: String, required: true },
  notes: { type: String }, // For appointment purpose
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Create Appointment and Notify Routine Tasks Service
app.post('/appointments', async (req, res) => {
  try {
    const { petName, appointmentDate, appointmentTime, vetName, notes } = req.body;

    if (!petName || !appointmentDate || !appointmentTime || !vetName) {
      return res.status(400).json({ message: 'All fields except notes are required.' });
    }

    const newAppointment = new Appointment({
      petName,
      appointmentDate: new Date(appointmentDate), // Ensure date is properly formatted
      appointmentTime,
      vetName,
      notes,
    });

    const savedAppointment = await newAppointment.save();

    // Notify Routine Task Tracker
    try {
      await axios.post('http://localhost:3004/routine-tasks', {
        petName,
        lastAppointmentDate: appointmentDate, // Pass the exact date from the request
      });
      console.log('Notifying Routine Task Tracker:', {
        petName,
        lastAppointmentDate: appointmentDate,
      });
    } catch (error) {
      console.error('Error notifying Routine Task Tracker:', error.message);
    }

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error('Error creating appointment:', error.message);
    res.status(500).json({ message: 'Failed to create appointment', error: error.message });
  }
});

// Fetch All Appointments
app.get('/appointments', async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const appointments = await Appointment.find(query);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Microservice C (Appointments Service) is running.',
  });
});

app.listen(PORT, () => {
  console.log(`Appointments Service running on http://localhost:${PORT}`);
});