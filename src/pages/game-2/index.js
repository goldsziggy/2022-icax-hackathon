import React, { useState } from 'react';
import './game-2.css';
import { ReactComponent as BloodCell } from './blood-cell.svg';
import useAudio from '../../hooks/use-audio';

const questions = require('./questions.json');

export default function SickleCellQuiz() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const SHORT_YAY_URL = `${process.env.PUBLIC_URL}/short-yay.mp3`;
  const AWW_URL = `${process.env.PUBLIC_URL}/aww.mp3`;
  const FUNNY_YAY_URL = `${process.env.PUBLIC_URL}/funny-yay.mp3`;
  const [playingYay, toggleYay] = useAudio(SHORT_YAY_URL);
  const [playingAww, toggleAww] = useAudio(AWW_URL);
  const [playingFunny, toggleFunny] = useAudio(FUNNY_YAY_URL);

  const choiceClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      toggleYay();
    } else {
      toggleAww();
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
      toggleFunny();
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
  };

  return (
    <div className="App">
      <h1>Sickle Cell Disease Quiz</h1>
      <h2>
        Current Score:
        {' '}
        {score}
      </h2>
      <div className="blood-cell-container">
        <BloodCell />
      </div>

      { showFinalResults
        ? (
          <div className="final-results">
            <h1> Final Results: </h1>
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
