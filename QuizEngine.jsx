import './QuizEngine.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions';

const QuizEngine = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(15);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem("quizPlayer")) || {};
    const { category = "General", difficulty = "easy" } = playerData;

    const filtered = questionsData.filter(
      (q) =>
        q.category.toLowerCase() === category.toLowerCase() &&
        q.difficulty.toLowerCase() === difficulty.toLowerCase()
    );

    setQuestions(filtered);
  }, []);

  // ✅ Timer and auto-next logic
  useEffect(() => {
    if (!questions.length) return;

    if (timer === 0) {
      handleNext(); // auto-next
      return;
    }

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, questions]);

  const handleOptionClick = (option) => {
    if (selected) return;

    setSelected(option);
    const isCorrect = option === questions[questionIndex].correctAnswer;

    setAnswers([
      ...answers,
      {
        questionIndex,
        question: questions[questionIndex].question,
        answer: option,
        isCorrect,
        time: 15 - timer,
      },
    ]);
  };

  const handleNext = () => {
    setSelected(null);
    setTimer(15);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const playerData = JSON.parse(localStorage.getItem("quizPlayer")) || {};
      const score = answers.filter((a) => a.isCorrect).length;
      const time = answers.reduce((total, a) => total + a.time, 0);
      const date = new Date().toLocaleString();

      const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      leaderboard.push({
        name: playerData.name || "Player",
        score,
        time,
        date,
      });

      localStorage.setItem('quizResults', JSON.stringify(answers));
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

      navigate('/quiz/summary');
    }
  };

  if (questions.length === 0) {
    return <p>Loading questions or no questions found!</p>;
  }

  const currentQuestion = questions[questionIndex];

  return (
    <div className="quiz-box">
      <h2>
        Q{questionIndex + 1}. {currentQuestion.question}
      </h2>

      <div className="options">
        {currentQuestion.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${
              selected && opt === currentQuestion.correctAnswer
                ? 'correct'
                : ''
            } ${
              selected &&
              opt === selected &&
              opt !== currentQuestion.correctAnswer
                ? 'wrong'
                : ''
            }`}
            onClick={() => handleOptionClick(opt)}
            disabled={!!selected}
          >
            {opt}
          </button>
        ))}
      </div>

      <p>⏳ Time Remaining: {timer}s</p>

      {selected && (
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default QuizEngine;
