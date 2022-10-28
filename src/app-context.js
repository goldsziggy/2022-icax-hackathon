import { createContext } from "react";

const defaultState = {
  pollingIntervals: [],
  addPollingInterval: () => {},
  matchingGameState: {},
  setMatchingGameState: () => {},
  quizGameState: {},
  setQuizGameState: () => {},
  petGameState: {},
  dispatchPetGameState: () => {},
  petGamePollFunction: () => {},
  setPetGamePollFunction: () => {},
  setLanguage: () => {},
  language: "eng",
  waterClickerState: {},
  setWaterClickerState: () => {},
  waterClickerPollFunction: () => {},
  setWaterClickerPollFunction: () => {},
};

export default createContext(defaultState);
