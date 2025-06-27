import React from 'react';
import './Hero.css';
import heroImg from '../assets/quizhero.svg'; 
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz');
  };

  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="fade-in">Welcome to Quizy</h1>
        <p className="fade-in">Test your knowledge, improve your skills, and have fun!</p>
        <button className="cta-button" onClick={handleStart}>Start Quiz</button>
      </div>
      <div className="hero-right">
        <img src={heroImg} alt="Quiz Illustration" className="float-in" />
      </div>
    </section>
  );
};

export default Hero;
