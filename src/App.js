import React, { useMemo, useState, useEffect } from 'react';
import {
  Route,
  Routes,
  HashRouter,
} from 'react-router-dom';

import AppContext from './app-context';
import Layout from './layout';

import Game1, { statReducer, defaultPetGameState } from './pages/game-1';
import Game2 from './pages/game-2';
import Game3 from './pages/game-3';
import Game4 from './pages/game-4';
import Game5 from './pages/game-5';

function getInitialStateFromLocalStorage(itemName, defaultState) {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : defaultState;
}

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [matchingGameState, setMatchingGameState] = useState(getInitialStateFromLocalStorage('matchingGameState', {}));
  const [quizGameState, setQuizGameState] = useState(getInitialStateFromLocalStorage('quizGameState', {}));
  const [waterClickerState, setWaterClickerState] = useState(getInitialStateFromLocalStorage('waterClickerGameState', {}));
  const [petGamePollFunction, setPetGamePollFunction] = useState(() => {});
  const [waterClickerPollFunction, setWaterClickerPollFunction] = useState(() => {});
  const [wordlePollFunction, setWordlePollFunction] = useState(() => {});
  const [petGameState, dispatchPetGameState] = React.useReducer(statReducer, getInitialStateFromLocalStorage('petGameState', defaultPetGameState));
  const [wordleGameState, setWordleGameState] = useState(getInitialStateFromLocalStorage('wordleGameState', {}));
  const [language, setLanguage] = useState(getInitialStateFromLocalStorage('language', 'eng'));
  const sharedState = useMemo(() => ({
    notifications,
    matchingGameState,
    quizGameState,
    petGameState,
    dispatchPetGameState,
    petGamePollFunction,
    waterClickerState,
    waterClickerPollFunction,
    wordleGameState,
    setWordleGameState,
    setWaterClickerState,
    setNotifications,
    setMatchingGameState,
    setQuizGameState,
    setPetGamePollFunction,
    setWaterClickerPollFunction,
    wordlePollFunction,
    language,
    setLanguage,
    setWordlePollFunction,
  }), [wordleGameState, notifications, matchingGameState, quizGameState, petGameState,
    petGamePollFunction, waterClickerState, waterClickerPollFunction, language]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('running interval');
      if (matchingGameState.pollFunction) {
        const message = matchingGameState.pollFunction();
        if (message && message.length > 0) {
          const id = crypto.randomUUID();
          setNotifications([...notifications, { message, id }]);
          setTimeout(() => setNotifications(notifications), 1500);
        }
      }

      if (quizGameState.pollFunction) {
        const message = quizGameState.pollFunction();
        if (message && message.length > 0) {
          const id = crypto.randomUUID();
          setNotifications([...notifications, { message, id }]);
          setTimeout(() => setNotifications(notifications), 1500);
        }
      }

      if (petGamePollFunction) {
        const message = petGamePollFunction(petGameState, dispatchPetGameState, language);
        if (message && message.length > 0) {
          const id = crypto.randomUUID();
          setNotifications([...notifications, { message, id }]);
          setTimeout(() => setNotifications(notifications), 1500);
        }
      }

      if (waterClickerPollFunction) {
        const message = waterClickerPollFunction(waterClickerState, setWaterClickerState, language);
        if (message && message.length > 0) {
          const id = crypto.randomUUID();
          setNotifications([...notifications, { message, id }]);
          setTimeout(() => setNotifications(notifications), 1500);
        }
      }
      if (wordlePollFunction) {
        const message = wordlePollFunction(waterClickerState, setWaterClickerState);
        if (message && message.length > 0) {
          const id = crypto.randomUUID();
          setNotifications([...notifications, { message, id }]);
          setTimeout(() => setNotifications(notifications), 1500);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [matchingGameState, petGameState, waterClickerState, quizGameState, notifications, petGamePollFunction, waterClickerPollFunction]);

  useEffect(() => {
    localStorage.setItem('matchingGameState', JSON.stringify(matchingGameState));
    localStorage.setItem('quizGameState', JSON.stringify(quizGameState));
    localStorage.setItem('petGameState', JSON.stringify(petGameState));
    localStorage.setItem('waterClickerGameState', JSON.stringify(waterClickerState));
    localStorage.setItem('wordleGameState', JSON.stringify(wordleGameState));
    localStorage.setItem('language', JSON.stringify(language));
  }, [matchingGameState, petGameState, waterClickerState, quizGameState, wordleGameState, language]);

  return (
    <AppContext.Provider value={sharedState}>
      <HashRouter basename="/">
        <Routes>
          <Route path="*" element={<Layout />}>
            <Route
              path="1"
              element={<Game1 />}
            />
            <Route path="2" element={<Game2 />} />
            <Route path="3" element={<Game3 />} />
            <Route path="4" element={<Game4 />} />
            <Route path="5" element={<Game5 />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
}
