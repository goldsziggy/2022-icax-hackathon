import React, { useMemo, useState, useEffect } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { toast } from "react-toastify";

import AppContext from "./app-context";
import Layout from "./layout";
import theme from "./theme";

import Game1, { statReducer, defaultPetGameState } from "./pages/game-1";
import Game2 from "./pages/game-2";
import Game3 from "./pages/game-3";
import Game4 from "./pages/game-4";
import Game5 from "./pages/game-5";

function getInitialStateFromLocalStorage(itemName, defaultState) {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : defaultState;
}

function gameLoop(pollFunctions) {
  try {
    const gameNameForId = ["Doctr", "Quizr", "Flippr", "Clickr", "Wordlr"];
    const messages =
      pollFunctions
        .map(({ callbackFunction, gameId }) => {
          try {
            return { message: callbackFunction(), gameId };
          } catch (e) {
            return "";
          }
        })
        .filter((m) => m.message && m.message.length > 0) || [];

    messages.forEach(({ message, gameId }) => {
      const styledMessage = (
        <span>
          <strong>{gameNameForId[gameId - 1]}: </strong>
          {message}
        </span>
      );
      toast(styledMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  } catch (e) {
    console.error("inside game-loop", e);
  }
}

export default function App() {
  const [matchingGameState, setMatchingGameState] = useState(
    getInitialStateFromLocalStorage("matchingGameState", {})
  );
  const [quizGameState, setQuizGameState] = useState(
    getInitialStateFromLocalStorage("quizGameState", {})
  );
  const [waterClickerState, setWaterClickerState] = useState(
    getInitialStateFromLocalStorage("waterClickerGameState", {})
  );
  const [petGamePollFunction, setPetGamePollFunction] = useState(() => {});
  const [waterClickerPollFunction, setWaterClickerPollFunction] = useState(
    () => {}
  );
  const [wordlePollFunction, setWordlePollFunction] = useState(() => {});
  const [petGameState, dispatchPetGameState] = React.useReducer(
    statReducer,
    getInitialStateFromLocalStorage("petGameState", defaultPetGameState)
  );
  const [wordleGameState, setWordleGameState] = useState(
    getInitialStateFromLocalStorage("wordleGameState", {})
  );
  const [language, setLanguage] = useState(
    getInitialStateFromLocalStorage("language", "eng")
  );

  const sharedState = useMemo(
    () => ({
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
      setMatchingGameState,
      setQuizGameState,
      setPetGamePollFunction,
      setWaterClickerPollFunction,
      wordlePollFunction,
      language,
      setLanguage,
      setWordlePollFunction,
    }),
    [
      wordleGameState,
      matchingGameState,
      quizGameState,
      petGameState,
      petGamePollFunction,
      waterClickerState,
      waterClickerPollFunction,
      wordlePollFunction,
      language,
    ]
  );

  useEffect(() => {
    const interval = setInterval(
      () =>
        gameLoop([
          {
            callbackFunction: () =>
              petGamePollFunction(petGameState, dispatchPetGameState, language),
            gameId: 1,
          },
          {
            callbackFunction: () =>
              waterClickerPollFunction(
                waterClickerState,
                setWaterClickerState,
                language
              ),
            gameId: 4,
          },
          // () => wordlePollFunction(wordleGameState, setWordleGameState)
        ]),
      1000
    );
    return () => clearInterval(interval);
  }, [
    matchingGameState,
    petGameState,
    waterClickerState,
    quizGameState,
    language,
    petGamePollFunction,
    waterClickerPollFunction,
  ]);

  useEffect(() => {
    localStorage.setItem(
      "matchingGameState",
      JSON.stringify(matchingGameState)
    );
    localStorage.setItem("quizGameState", JSON.stringify(quizGameState));
    localStorage.setItem("petGameState", JSON.stringify(petGameState));
    localStorage.setItem(
      "waterClickerGameState",
      JSON.stringify(waterClickerState)
    );
    localStorage.setItem("wordleGameState", JSON.stringify(wordleGameState));
    localStorage.setItem("language", JSON.stringify(language));
  }, [
    matchingGameState,
    petGameState,
    waterClickerState,
    quizGameState,
    wordleGameState,
    language,
  ]);

  return (
    <AppContext.Provider value={sharedState}>
      <ThemeProvider theme={theme}>
        <HashRouter basename="/">
          <Routes>
            <Route path="*" element={<Layout />}>
              <Route path="1" element={<Game1 />} />
              <Route path="2" element={<Game2 />} />
              <Route path="3" element={<Game3 />} />
              <Route path="4" element={<Game4 />} />
              <Route path="5" element={<Game5 />} />
            </Route>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
