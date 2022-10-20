import { createContext } from 'react';

const defaultState = {
  notifications: [],
  addNotification: () => {},
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
  waterClickerState: {},
  setWaterClickerState: () => {},
  waterClickerPollFunction: () => {},
  setWaterClickerPollFunction: () => {},
};

export default createContext(defaultState);
