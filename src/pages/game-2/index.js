import React, { useState } from 'react';
import './game-2.css';

const questions = require('./questions.json');

export default function Game2() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const choiceClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      // TODO: turn correct choice green if correct?
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
  };

  return (
    <div className="App">
      <h1>Sickle Cell Anemia Quiz</h1>
      <h2>
        Current Score:
        {' '}
        {score}
      </h2>

      { showFinalResults
        ? (
          <div className="final-results">
            <h1> Final Results</h1>
            <h2>
              {score}
              {' '}
              out of
              {' '}
              {questions.length}
              {' '}
              correct!
            </h2>
            <button type="button" onClick={() => restartGame()}> Play Again </button>
          </div>
        )
        : (
          <div className="question-card">
            <h2>
              Question
              {' '}
              {currentQuestion + 1}
              {' '}
              of
              {' '}
              {questions.length}
            </h2>
            <h3 className="question-text">
              {questions[currentQuestion].question}
            </h3>
            <ul>
              {questions[currentQuestion].choices.map((choice) => (
                <li key={choice.id} onClick={() => choiceClicked(choice.isCorrect)}>
                  {choice.text}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
