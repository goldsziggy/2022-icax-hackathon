/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useContext } from "react";
import { Header, Box, Card, Flex } from "grape-ui-react";
import styled, { css } from "styled-components";
import useAudio from "../../hooks/use-audio";
import AppContext from "../../app-context";
import localization from "../../assets/localization.json";
import theme from "../../theme";
import WaterGlass from "./water-glass";

const handleClick = ({
  numberOfClicks,
  setWaterClickerState,
  waterClickerState,
  toggleSound,
  playing,
  currentFillState,
}) => {
  if (playing) return;
  if (currentFillState < 1) return;

  setWaterClickerState({
    ...waterClickerState,
    numberOfClicks: numberOfClicks + 1,
    currentFillState: currentFillState - 1,
    timeLastClicked: Date.now(),
  });
  toggleSound();
};
const SOUND_URL = `${process.env.PUBLIC_URL}/heavy_swallowwav-14682.mp3`;

const CustomCard = styled(Card)`
  transition-duration: 0.5s;
  ${(props) =>
    props.playing
      ? css`
          transform: scale(0.8);
        `
      : null}
`;

const pollFunction = () => (gameState, setGameState, language) => {
  try {
    const remainingTime = 30 - (Date.now() - gameState.timeLastClicked) / 1000;
    setGameState({
      ...gameState,
      timeTillRefresh: parseInt(remainingTime, 10),
    });

    if (remainingTime <= 0) {
      setGameState({
        ...gameState,
        timeLastClicked: Date.now(),
        currentFillState: 3,
      });

      return localization[language].waterDrinker.ui.notification;
    }
    return "";
  } catch (e) {
    console.log(e);
    return "";
  }
};

export default function WaterClicker() {
  const {
    setWaterClickerState,
    waterClickerState,
    setWaterClickerPollFunction,
    language,
  } = useContext(AppContext);

  const { currentFillState, timeLastClicked, numberOfClicks, timeTillRefresh } =
    waterClickerState;

  useEffect(() => {
    setWaterClickerPollFunction(pollFunction);
  }, []);

  const [playing, toggle] = useAudio(SOUND_URL);

  return (
    <Flex alignSelf="center" maxWidth="500px" maxHeight="800px">
      <Box>
        <CustomCard
          cardSubtitle={localization[language].waterDrinker.ui.title}
          cardTitle={localization[language].waterDrinker.ui.subtitle}
          background={theme.colors.white}
          playing={playing}
        >
          <WaterGlass
            currentFillState={currentFillState}
            onClick={() =>
              handleClick({
                numberOfClicks,
                setWaterClickerState,
                waterClickerState,
                toggleSound: toggle,
                playing,
                currentFillState,
              })
            }
          />

          <Header.h5>
            {currentFillState === 0
              ? localization[language].waterDrinker.ui.out
              : localization[language].waterDrinker.ui.click}
          </Header.h5>
          <Header.h6>
            {localization[language].waterDrinker.ui.counter} {numberOfClicks}!
          </Header.h6>
          <Card.Body>
            {currentFillState === 0
              ? `${localization[language].waterDrinker.ui.timer} ${timeTillRefresh}`
              : localization[language].waterDrinker.ui.desc}
          </Card.Body>
        </CustomCard>
      </Box>
    </Flex>
  );
}
