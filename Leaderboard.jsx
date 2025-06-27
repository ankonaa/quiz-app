import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setEntries(results);
  }, []);

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'time') return a.time - b.time;
    return 0;
  });

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>

      <div className="sort-controls">
        <label>Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="score">Score</option>
          <option value="time">Time</option>
        </select>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
            <th>Time (s)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
              <td>{entry.time}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
