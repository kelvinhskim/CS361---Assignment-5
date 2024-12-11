import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = ({ setRegisteredUsers, setWelcomeMessage, setLoggedInUser, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState(''); // New state for breed
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(), // Unique ID for the user
      name: username,
      email: email,
      password,
      pet: {
        petName,
        petAge,
        petGender,
        petType,
        petBreed,
      },
    };

    // Add the new user to the registered users list
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);

    // Automatically log in the user after registration
    setLoggedInUser(newUser);
    setIsLoggedIn(true);
    console.log('Registered User:', newUser);

    // Set welcome message
    setWelcomeMessage(`Welcome, ${username}!`);

    // Redirect to My Pet page
    navigate('/my-pet');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <h3>Pet Information</h3>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pet Age:</label>
          <input
            type="number"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={petGender}
            onChange={(e) => setPetGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Type:</label>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;