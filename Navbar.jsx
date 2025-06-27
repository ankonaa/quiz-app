import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo"> 🧠Quizy</h1>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home">Home</a>
          <a href="#start">Start Quiz</a>
          <a href="#scores">Scores</a>
          <a href="#about">About</a>
        </div>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✖' : '☰'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
