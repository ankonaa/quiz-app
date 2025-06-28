import React from 'react';
import {HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AddPlayerForm from './components/AddPlayerForm';
import QuizEngine from './components/QuizEngine';
import ScoreSummary from './components/ScoreSummary';
import Leaderboard from './components/Leaderboard';




function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/quiz" element={<AddPlayerForm />} />
        <Route path="/quiz/start" element={<QuizEngine/>} />
        <Route path="/quiz/summary" element={<ScoreSummary />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      
      </Routes>
    </HashRouter>
  );
}

export default App;
