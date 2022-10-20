/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import GirlSvg from './girl1.svg';
import GlassOfWater from './glass-of-water.svg';
import Syringe from './syringe.svg';
import Pills from './pills.svg';

function Stat({ className, name, value }) {
  return (
    <div className={className}>
      <span>{name}:</span>
      <span>{value}</span>
    </div>
  );
}

const Girl = styled.img``;
const Buttons = styled.div``;
const StatsBox = styled.div`
  padding: 30px;
  font-family: Skia;
  font-size: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid black;
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
const StyledStat = styled(Stat)`
  display: grid;
  color: ${(p) => (p.alert ? 'red' : 'black')};
  font-weight: ${(p) => (p.alert ? 'bold' : 'normal')};
`;
const StyledImage = styled.img`
  height: 80px;
  width: 80px;
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
`;
export default function Game1() {
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
        };
      default:
        throw new Error();
    }
  }
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
    <>
      <StatsBox>
        <StyledStat
          name="Hydration"
          value={`${state.hydration}%`}
          alert={state.hydration !== null && state.hydration < 90}
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
      <div>{JSON.stringify(state)}</div>
    </>
  );
}
