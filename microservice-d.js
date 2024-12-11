const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/petcare')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const routineTaskSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  lastAppointmentDate: { type: Date, required: true },
  nextCheckupDate: { type: Date, required: true },
});

const RoutineTask = mongoose.model('RoutineTask', routineTaskSchema);

// Delete a Routine Task
app.delete('/routine-tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Task ID is required.' });
    }

    const deletedTask = await RoutineTask.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.', task: deletedTask });
  } catch (error) {
    console.error('Error deleting routine task:', error.message);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});

// Create or Update Routine Task
app.post('/routine-tasks', async (req, res) => {
  try {
    const { petName, lastAppointmentDate } = req.body;

    console.log('Received Data for Routine Task Update:', {
      petName,
      lastAppointmentDate,
    });

    // Parse the date and normalize it to UTC
    const parsedLastAppointmentDate = new Date(lastAppointmentDate);
    parsedLastAppointmentDate.setUTCHours(0, 0, 0, 0); // Normalize to start of day UTC
    console.log('Parsed Last Appointment Date:', parsedLastAppointmentDate);

    // Calculate the next check-up date
    const nextCheckupDate = new Date(parsedLastAppointmentDate);
    nextCheckupDate.setMonth(nextCheckupDate.getMonth() + 6);
    console.log('Calculated Next Check-Up Date:', nextCheckupDate);

    // Update or create the routine task
    const routineTask = await RoutineTask.findOneAndUpdate(
      { petName },
      {
        lastAppointmentDate: parsedLastAppointmentDate,
        nextCheckupDate,
      },
      { new: true, upsert: true }
    );

    console.log('Updated Routine Task:', routineTask);

    res.status(201).json({ message: 'Routine task added/updated successfully', task: routineTask });
  } catch (error) {
    console.error('Error adding/updating routine task:', error.message);
    res.status(500).json({ error: 'Failed to add/update routine task.' });
  }
});



// Fetch All Routine Tasks
app.get('/routine-tasks', async (req, res) => {
  try {
    const tasks = await RoutineTask.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch routine tasks' });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Microservice D (Routine Tasks Service) is running.',
  });
});

app.listen(PORT, () => {
  console.log(`Routine Tasks Service running at http://localhost:${PORT}`);
});
