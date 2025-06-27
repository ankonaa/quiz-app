import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPlayerForm.css';

const AddPlayerForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const playerData = {
      name,
      category,
      difficulty,
    };

    localStorage.setItem('playerData', JSON.stringify(playerData));
    navigate('/quiz/start');
  };

  const isFormValid = name && category && difficulty;

  return (
    <div className="player-form-container">
      <h2>Get Ready to Play!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="science">Science</option>
          <option value="tech">Technology</option>
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button type="submit" disabled={!isFormValid}>
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default AddPlayerForm;
