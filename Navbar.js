import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">Pet Care</div>
      <button className="navbar-hamburger" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <div className={`navbar-links ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/appointments" className="navbar-link">
          Appointments
        </Link>
        <Link to="/pet-profiles" className="navbar-link">
          Pet Profiles
        </Link>
        <Link to="/routine-tasks" className="navbar-link">
          Routine Tasks
        </Link>
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

