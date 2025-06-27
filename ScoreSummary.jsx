import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions'; // ✅ Must import questions
import './ScoreSummary.css';

const ScoreSummary = () => {
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('quizPlayer')) || {};
    const resultData = JSON.parse(localStorage.getItem('quizResults')) || [];

    setPlayerName(playerData.name || 'Player');
    setTotalQuestions(resultData.length);
    setTotalTime(resultData.reduce((sum, r) => sum + r.time, 0));

    // ✅ Calculate score by comparing with correct answer from questionsData
    const correctCount = resultData.filter((r) => {
      const original = questionsData[r.questionIndex];
      return original && original.correctAnswer === r.answer;
    }).length;

    setScore(correctCount);
  }, []);

  const getMessage = () => {
    const ratio = score / totalQuestions;
    if (ratio >= 0.8) return '🎉 Quiz Champion!';
    if (ratio >= 0.5) return '👏 Good Job!';
    return '☕ More caffeine, maybe?';
  };

  const handlePlayAgain = () => {
    localStorage.removeItem('quizResults');
    navigate('/quiz');
  };

  return (
    <div className="score-summary">
      <h2>Well done, {playerName}!</h2>
      <p>✅ Score: {score} / {totalQuestions}</p>
      <p>⏱️ Time Taken: {totalTime} seconds</p>
      <h3>{getMessage()}</h3>
      <button onClick={handlePlayAgain}>🔁 Play Again</button>
    </div>
  );
};

export default ScoreSummary;
