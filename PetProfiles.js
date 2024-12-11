import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PetProfiles.css'; // Import the CSS file for styling

const PetProfiles = () => {
  // Declare pets state to manage the list of saved pets
  const [pets, setPets] = useState([]); 
  const [petName, setPetName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('Dog'); // Default pet type is Dog

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new pet object
    const newPet = {
      petName,
      age,
      breed,
      gender,
      type,
    };
    

    // Update pets state with the new pet
    setPets([...pets, newPet]);

    // Clear the input fields after saving
    setPetName('');
    setAge('');
    setBreed('');
    setGender('');
    setType('Dog');
  };

  return (
    <div className="pet-profiles-container">
      <h2>Pet Profiles</h2>

      {/* Form for adding a pet */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <button type="submit">Add Pet</button>
      </form>

      {/* Display the list of saved pets */}
      {pets.length > 0 && (
        <div className="saved-pets">
          <h3>Saved Pets</h3>
          <ul>
            {pets.map((pet, index) => (
              <li key={index}>
                <strong>{pet.type}</strong> - {pet.petName}, {pet.age} years old, {pet.gender}, {pet.breed}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PetProfiles;