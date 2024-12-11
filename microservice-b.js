const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log('Request Body:', req.body);
  }
  next();
});

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/petprofiles', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Define Schema for Pet Profiles
const petProfileSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
});

const PetProfile = mongoose.model('PetProfile', petProfileSchema);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Microservice B (Pet Profiles Service) is running.',
  });
});

// GET /pets - Fetch all pets or filter by ownerId
app.get('/pets', async (req, res) => {
  try {
    const { ownerId } = req.query;
    console.log('GET /pets request received for ownerId:', ownerId || 'All');
    const query = ownerId ? { ownerId } : {};
    const pets = await PetProfile.find(query);
    console.log('Fetched Pet Profiles:', pets);
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pet profiles:', error.message);
    res.status(500).json({ error: 'Failed to fetch pet profiles' });
  }
});

// POST /pets - Add a new pet profile
app.post('/pets', async (req, res) => {
  try {
    console.log('POST /pets received:', req.body);

    // Validate request body
    const { ownerId, petName, petType, breed, age, gender } = req.body;
    if (!ownerId || !petName || !petType || !breed || age === undefined || !gender) {
      console.log('Validation failed for POST /pets');
      return res
        .status(400)
        .json({ error: 'All fields (ownerId, petName, petType, breed, age, gender) are required.' });
    }

    // Save the new pet profile to the database
    const pet = new PetProfile(req.body);
    const savedPet = await pet.save();
    console.log('Saved Pet Profile:', savedPet);
    res.status(201).json({ message: 'Pet profile created successfully', pet: savedPet });
  } catch (error) {
    console.error('Error creating pet profile:', error.message);
    res.status(500).json({ error: 'Failed to create pet profile' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the Microservice
app.listen(PORT, () => {
  console.log(`Microservice B running on http://localhost:${PORT}`);
});

