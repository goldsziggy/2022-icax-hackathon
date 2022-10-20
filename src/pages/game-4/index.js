import React, { useState, useEffect } from 'react';
import {
  Header, Box, Card, Flex, Paragraph,
} from 'grape-ui-react';
import styled, { css } from 'styled-components';
import useAudio from '../../hooks/use-audio';
import { ReactComponent as WaterGlass } from '../../assets/waterglass.svg';

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
      return css`.cls-0, .cls-1, .cls-2, ellipse {
        transition-delay: .5s;
        transform: matrix(1,0,0,1,0,0);
      }
      text {
        transition-delay: .5s;
        transform: matrix(4.188377, 0, 0, 0.583715, -173.178467, 6.433594);
      }`;
    } if (props.currentFillState === 2) {
      return css`
      .cls-0, .cls-1, .cls-2, ellipse {
        transition-delay: .5s;
        transform: matrix(1,0,0,.75,0,30);
      }
      text {
        transition-delay: .5s;
        transform: matrix(4.188377, 0, 0, 0.583715, -173.178467, 15.433594);
      }
    `;
    }
    return css`
        .cls-0, .cls-1, .cls-2, ellipse {
          transition-delay: .5s;
          transform: matrix(.9,0,0,.33,6,80);
        }
        text {
          transition-delay: .5s;
          transform: matrix(4.188377, 0, 0, 0.583715, -171.178467, 30.433594);
        }
    `;
  }}
`;
export default function Game3() {
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [currentFillState, setCurrentFillState] = useState(3);
  const [timeLastClicked, setTimeLastClicked] = useState(Date.now());
  const [timeTillRefresh, setTimeTillRefresh] = useState(0);

  const [playing, toggle] = useAudio(SOUND_URL);

  useEffect(() => {
    setTimeout(() => {
      const remainingTime = 30 - (Date.now() - timeLastClicked) / 1000;
      setTimeTillRefresh(parseInt(remainingTime));
      if (remainingTime <= 0) {
        setNumberOfClicks(3);
        setCurrentFillState(3);
      }
    }, 1000);
  }, [timeTillRefresh, timeLastClicked]);

  return (
    <Flex alignSelf="center" maxWidth="500px" maxHeight="800px">
      <Box>
        <CustomCard
          cardSubtitle="Taking inspiration from the cookie clicker game!"
          cardTitle="Water Drinker!"
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
            {currentFillState === 0 ? 'Out of clicks!' : 'Click Me!'}
          </Header.h5>
          <Header.h6>
            Your Current Drink Counter is
            {' '}
            {numberOfClicks}
            !
          </Header.h6>
          <Card.Body>
            {currentFillState === 0 ? `You are currently out of clicks! Please check back in ${timeTillRefresh} seconds when you earn another drink.` : 'Try to get your personal high score of drinking the most water!  I heard there is a random secret that sometimes happens....'}
          </Card.Body>
        </CustomCard>
      </Box>

    </Flex>
  );
}
