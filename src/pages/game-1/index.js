/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import GirlSvg from './girl1.svg';
import GlassOfWater from './glass-of-water.svg';
import Syringe from './syringe.svg';
import Pills from './pills.svg';
import AppContext from '../../app-context';

export const hydrationThreshold = 30;
export const millisecondsPerSecond = 600 * 1000; // default to one minute/sec

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
  width: 50px;
  align-self: center;
  display: flex;
  flex-direction: row;
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
export function getMessage(key, param) {
  switch (key) {
    case 'welcome':
      return 'Hi! My name is _____ and I have sickle cell disease. Please take care of me!';
    case 'hydration1':
      return 'Keep it up! Drinking lots of water is key';
    case 'hydration2':
      return 'Water is life!';
    case 'hydration3':
      return 'I love drinking water!';
    case 'hydration4':
      return 'Aahhh, refreshing!';
    case 'gaveAntibiotics':
      return 'Excellent! Daily antibiotic use can prevent infections';
    case 'medStreak':
      return `${param} ${param === 1 ? 'dose' : 'doses'} in a row`;
    case 'vaccination':
      return "Great job! It's important to stay up-to-date on your shots to prevent infections";
    case 'vaccinationsUpToDate':
      return "You're up-to-date on your shots!";
    case 'antibioticsWait':
      return 'You already gave antibiotics today! Wait at least 12 hours';
    default:
      return '';
  }
}

const StyledImage = styled.img`
  height: 50px;
  width: 50px;
  border: 2px solid #65EFCF;
  opacity: ${(p) => (p.enabled ? 1 : 0.25)};
  border-radius:10px;
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
export function statReducer(state, action) {
  console.log('called');
  switch (action.type) {
    case 'GIVE_WATER':
      return {
        ...state,
        hydration: Math.min(100, state.hydration + action.value),
        message: getMessage(`hydration${state.hydration % 4 + 1}`),
      };
    case 'GIVE_SHOT':
      return {
        ...state,
        shots: { upToDate: true, lastGiven: state.currentTime },
        message:
          getMessage(state.shots.upToDate ? 'vaccinationsUpToDate' : 'vaccination'),
      };
    case 'GIVE_ANTIBIOTICS':
    {
      if (!state.antibiotics.upToDate) {
        return {
          ...state,
          message: getMessage('gaveAntibiotics'),
          antibiotics: { upToDate: true, lastGiven: state.currentTime, streak: state.antibiotics.streak + 1 },
        };
      }
      return { ...state, message: getMessage('antibioticsWait') };
    }
    case 'ADVANCE_TIME': {
      const newPainLevel = state.hydration > hydrationThreshold
        ? 0
        : Math.floor(
          -10 * ((state.hydration - hydrationThreshold) / hydrationThreshold),
        );
      const newLastHadPain = state.pain.level > 0 ? state.currentTime : state.pain.lastHadPain;
      const oneDay = 1000 * 60 * 60 * 24;
      const halfDay = oneDay / 2;
      const timeSinceLastGivenAntibiotics = state.currentTime - state.antibiotics.lastGiven;
      const timeSinceLastGivenShots = state.currentTime - state.shots.lastGiven;
      return {
        ...state,
        currentTime: state.currentTime + action.value,
        hydration: Math.max(0, state.hydration - 1),
        shots: { ...state.shots, upToDate: timeSinceLastGivenShots < 60 * halfDay },
        antibiotics: {
          ...state.antibiotics,
          upToDate: (timeSinceLastGivenAntibiotics < halfDay),
          streak: (timeSinceLastGivenAntibiotics > oneDay ? 0 : state.antibiotics.streak),
        },
        pain: {
          ...state.pain,
          level: newPainLevel,
          lastHadPain: newLastHadPain,
          daysWithoutPain:
            newPainLevel > 0
              ? 0
              : (Math.floor(100 * ((state.currentTime - newLastHadPain)
                / (1000 * 60 * 60 * 24))) / 100),
        },
      };
    }
    default:
      throw new Error();
  }
}
export default function Game1() {
  const { petGameState: state, setPetGamePollFunction, dispatchPetGameState: dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    setPetGamePollFunction(() => (gameState, dispatch) => {
      try {
        console.log('here', gameState);
        dispatch({ type: 'ADVANCE_TIME', value: millisecondsPerSecond });
        if (gameState.hydration === 50) {
          return 'getting thirsty';
        }
      } catch (e) {
        console.log(e);
      }
    });
  }, [setPetGamePollFunction]);

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
        <StyledStat name="Pain" value={`${state.pain.level}`} />
        <StyledStat name="Active Infection?" value={`${state.activeInfection ? 'yes' : 'no'}`} alert={state.activeInfection} />
        <StyledStat name="Temperature" value={`${state.temperature}°F`} />
        <StyledStat
          name="Days without pain"
          value={state.pain.daysWithoutPain}
        />
        <StyledStat name="Med streak" value={getMessage('medStreak', state.antibiotics.streak)} />
        <StyledStat
          name="Current Date"
          value={`${new Date(state.currentTime).toLocaleDateString()}
          
          ${new Date(state.currentTime).toLocaleTimeString()}`}
        />
      </StatsBox>
      <Buttons>
        <StyledImage
          src={GlassOfWater}
          enabled={state.hydration < 100}
          onClick={() => {
            dispatch({ type: 'GIVE_WATER', value: 10 });
          }}
        />
        <StyledImage
          src={Syringe}
          enabled={!state.shots.upToDate}
          onClick={() => {
            dispatch({ type: 'GIVE_SHOT' });
          }}
        />
        <StyledImage
          src={Pills}
          enabled={!state.antibiotics.upToDate}
          onClick={() => {
            dispatch({ type: 'GIVE_ANTIBIOTICS' });
          }}
        />
      </Buttons>
      <Message>{state.message}</Message>
      <Girl src={GirlSvg} />
    </Grid>
  );
}
