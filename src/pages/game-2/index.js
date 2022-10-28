import React, { useState } from "react";
import { Box, Flex } from "grape-ui-react";
import "./game-2.css";
import styled from "styled-components";
import { ReactComponent as BloodCell } from "./blood-cell.svg";
import useAudio from "../../hooks/use-audio";

const questions = require("./questions.json");

const CustomBackground = styled(Flex)`
  background-image: linear-gradient(to left, #f39f86, #f9d976);
`;

export default function SickleCellQuiz() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const SHORT_YAY_URL = `${process.env.PUBLIC_URL}/short-yay.mp3`;
  const AWW_URL = `${process.env.PUBLIC_URL}/aww.mp3`;
  const FUNNY_YAY_URL = `${process.env.PUBLIC_URL}/funny-yay.mp3`;
  const [, toggleYay] = useAudio(SHORT_YAY_URL);
  const [, toggleAww] = useAudio(AWW_URL);
  const [, toggleFunny] = useAudio(FUNNY_YAY_URL);

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
    <CustomBackground alignSelf="center" maxWidth="500px" maxHeight="800px">
      <Box>
        <h1>Sickle Cell Disease Quiz</h1>
        <h2>Current Score: {score}</h2>
        <div className="blood-cell-container">
          <BloodCell />
        </div>

        {showFinalResults ? (
          <div className="final-results">
            <h1> Final Results: </h1>
            <h2>
              {score} out of {questions.length} correct!
            </h2>
            <button type="button" onClick={() => restartGame()}>
              {" "}
              Play Again{" "}
            </button>
          </div>
        ) : (
          <div className="question-card">
            <h2>
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <h3 className="question-text">
              {questions[currentQuestion].question}
            </h3>
            <ul>
              {questions[currentQuestion].choices.map((choice) => (
                <li>
                  <div
                    key={choice.id}
                    role="button"
                    tabIndex="0"
                    onClick={() => choiceClicked(choice.isCorrect)}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        choiceClicked(choice.isCorrect);
                      }
                    }}
                  >
                    {choice.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Box>
    </CustomBackground>
  );
}
