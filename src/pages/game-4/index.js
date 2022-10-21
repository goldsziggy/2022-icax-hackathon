import React, { useState, useEffect, useContext } from 'react';
import {
  Header, Box, Card, Flex,
} from 'grape-ui-react';
import styled, { css } from 'styled-components';
import useAudio from '../../hooks/use-audio';
import AppContext from '../../app-context';
import { ReactComponent as WaterGlass } from '../../assets/waterglass.svg';
import localization from '../../assets/localization.json';

const handleClick = ({
  numberOfClicks, setNumberOfClicks, toggleSound,
  playing, currentFillState, setCurrentFillState,
  setTimeLastClicked,
}) => {
  if (playing) return;
  if (currentFillState < 1) return;
  setNumberOfClicks(numberOfClicks + 1);
  setCurrentFillState(currentFillState - 1);
  setTimeLastClicked(Date.now());
  toggleSound();
};
const SOUND_URL = `${process.env.PUBLIC_URL}/heavy_swallowwav-14682.mp3`;

const CustomCard = styled(Card)`
transition-duration: .5s;
${(props) => (props.playing ? css`transform: scale(.8)` : null)}  
`;
const WaterGlassContainer = styled.div`
  


${(props) => {
    if (props.currentFillState === 3) {
      return css`.cls-0, .cls-1, .cls-2, ellipse, #text {
        transition-delay: .5s;
        transform: matrix(1,0,0,1,0,0);
      }`;
    } if (props.currentFillState === 2) {
      return css`
      .cls-0, .cls-1, .cls-2, ellipse, #text {
        transition-delay: .5s;
        transform: matrix(.95,0,0,.75,3,30);
      }
    `;
    } if (props.currentFillState === 1) {
      return css`
        .cls-0, .cls-1, .cls-2, ellipse, #text {
          transition-delay: .5s;
          transform: matrix(.9,0,0,.33,6,81);
        }
    `;
    }

    return css`
        .cls-0, .cls-1, .cls-2, ellipse, #text {
          transition-delay: .5s;
          transform: matrix(.75, 0, 0, 0.05, 14, 115)
        }
    `;
  }}
`;

const pollFunction = () => (gameState, setGameState, language) => {
  try {
    const remainingTime = 30 - (Date.now() - gameState.timeLastClicked) / 1000;
    setGameState({ ...gameState, timeTillRefresh: parseInt(remainingTime, 10) });

    console.log('inside poll!', {
      remainingTime,
      timeTillRefresh: gameState.timeTillRefresh,
      timeLastClicked: gameState.timeLastClicked,
      numberOfClicks: gameState.numberOfClicks,
    });

    if (remainingTime <= 0) {
      setGameState({ ...gameState, timeLastClicked: Date.now(), currentFillState: 3 });

      return localization[language].waterDrinker.ui.notification;
    }
    return '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

export default function WaterClicker() {
  const {
    setWaterClickerState, waterClickerState, setWaterClickerPollFunction, language,
  } = useContext(AppContext);

  const [numberOfClicks, setNumberOfClicks] = useState(waterClickerState.numberOfClicks || 0);
  const [currentFillState, setCurrentFillState] = useState(waterClickerState.currentFillState || 3);
  const [timeLastClicked, setTimeLastClicked] = useState(waterClickerState.timeLastClicked || Date.now());
  const timeTillRefresh = waterClickerState.timeTillRefresh || 0;

  useEffect(() => {
    setWaterClickerState({
      numberOfClicks,
      currentFillState,
      timeLastClicked,
      timeTillRefresh,
    });
  }, [numberOfClicks, currentFillState, timeLastClicked, timeTillRefresh]);

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
          playing={playing}
        >
          <WaterGlassContainer currentFillState={currentFillState}>
            <WaterGlass onClick={() => handleClick({
              numberOfClicks,
              setNumberOfClicks,
              toggleSound: toggle,
              playing,
              currentFillState,
              setCurrentFillState,
              setTimeLastClicked,
            })}
            />
          </WaterGlassContainer>

          <Header.h5>
            {currentFillState === 0 ? localization[language].waterDrinker.ui.out : localization[language].waterDrinker.ui.click}
          </Header.h5>
          <Header.h6>
            {localization[language].waterDrinker.ui.counter}
            {' '}
            {numberOfClicks}
            !
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
