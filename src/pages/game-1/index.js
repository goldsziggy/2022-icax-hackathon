/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import GirlSvg from './girl1.svg';
import GlassOfWater from './glass-of-water.svg';
import Syringe from './syringe.svg';
import Pills from './pills.svg';

const hydrationThreshold = 30;
function Stat({ className, name, value }) {
  return (
    <>
      <span className={className}>{name}:</span>
      <span className={className}>{value}</span>
    </>
  );
}
const StyledStat = styled(Stat)`
  display: grid;
  color: ${(p) => (p.alert ? 'red' : 'black')};
  font-weight: ${(p) => (p.alert ? 'bold' : 'normal')};
`;
const Girl = styled.img`
  height: 50vh;
  width: 50vh;
`;
const Buttons = styled.div`
  margin: 0px;
  padding: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-self: right;
`;
const StatsBox = styled.div`
  margin-right: 10px;
  margin-top: 30px;
  margin-left: 10px;
  font-family: Skia;
  font-size: 15px;
  display: grid;
  grid-template-columns: 150px 1fr;
  height: 25vh;
  width: 95vw;
  text-align: left;
`;
const Message = styled.div`
  font-family: Skia;
  font-size: 16px;
  font-weight: bold;
  width: 250px;
  padding: 5px;
  align-self: center;
`;
function getHydrationMessage() {
  return 'Keep it up! Drinking lots of water is key';
}

const StyledImage = styled.img`
  height: 50px;
  width: 50px;
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
`;
const Grid = styled.div`
  position: absolute;
  display: inherit;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function statReducer(state, action) {
  switch (action.type) {
    case 'GIVE_WATER':
      return {
        ...state,
        hydration: state.hydration + action.value,
        message: getHydrationMessage(),
      };
    case 'GIVE_SHOT':
      return {
        ...state,
        shots: { upToDate: true, lastGiven: state.currentTime },
        message:
          "Great! It' important to stay up-to-date on your shots to prevent infections",
      };
    case 'GIVE_ANTIBIOTICS':
      return {
        ...state,
        antibiotics: { upToDate: true, lastGiven: state.currentTime },
      };
    case 'ADVANCE_TIME':
      return {
        ...state,
        currentTime: state.currentTime + action.value,
        hydration: state.hydration - 1,
        pain: state.hydration > hydrationThreshold ? 0 : 1,
      };
    default:
      throw new Error();
  }
}

export default function Game1() {
  const [state, dispatch] = React.useReducer(statReducer, {
    hydration: 100,
    pain: 0,
    temperature: 68,
    daysWithoutPain: 0,
    medStreak: 0,
    antibiotics: { upToDate: false, lastGiven: null },
    shots: { upToDate: false, lastGiven: null },
    currentTime: Date.now(),
    message: 'hello!',
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'ADVANCE_TIME', value: 60 * 1000 });
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Grid>
      <StatsBox>
        <StyledStat
          name="Hydration"
          value={`${state.hydration}%`}
          alert={
            state.hydration !== null && state.hydration < hydrationThreshold
          }
        />
        <StyledStat name="Pain" value={`${state.pain}`} />
        <StyledStat name="Temperature" value={`${state.temperature}°F`} />
        <StyledStat name="Days without pain" value={state.daysWithoutPain} />
        <StyledStat name="Med streak" value={state.medStreak} />
        <StyledStat
          name="Time"
          value={`${new Date(state.currentTime).toLocaleDateString()}
          
          ${new Date(state.currentTime).toLocaleTimeString()}`}
        />
      </StatsBox>
      <Buttons>
        <StyledImage
          src={GlassOfWater}
          onClick={() => {
            dispatch({ type: 'GIVE_WATER', value: 10 });
          }}
        />
        <StyledImage
          src={Syringe}
          onClick={() => {
            dispatch({ type: 'GIVE_SHOT' });
          }}
        />
        <StyledImage
          src={Pills}
          onClick={() => {
            dispatch({ type: 'GIVE_ANTIBIOTICS' });
          }}
        />
      </Buttons>
      <Message>{state.message}</Message>
      <Girl src={GirlSvg} />
      <StatsBox>{JSON.stringify(state)}</StatsBox>
    </Grid>
  );
}
