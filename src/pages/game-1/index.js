/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as GirlSvg } from './girl1.svg';
import { ReactComponent as SickGirlSvg } from './sickgirl.svg';
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
const Girl = styled.div`
align-self:center;


#path162 {
  animation-iteration-count: infinite;
  animation-play-state: running;
  animation-duration: .5s;
  animation-direction: alternate;
  animation-delay: 3s;
  animation-name: wave;
}

@keyframes wave {
  from {transform: rotate(0deg);}
  to {transform: rotate(20deg) translateX(4px) translateY(-2px);}
}


${(props) => {
    if (props.sick) {
      return css`
    #path874 {
      fill: yellow !important;
      fill-opacity: .8 !important;
      
    }

    #path898 {
      animation-name: frown;
      animation-duration: 1.2s;
      animation-iteration-count: infinite;
    }

    @keyframes frown {
      from {transform: translateY(0);}
      to {transform: translateY(-4px);}
    }
    `;
    } return css`
    #path874 {
      fill: white !important;
      fill-opacity: 1 !important;
   
    }
    `;
  }}
  
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
  margin-top: 40px;
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
  min-height:45px;
  
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
      return 'Aahhh, so refreshing!';
    case 'gaveAntibiotics':
      return 'Excellent! Daily antibiotic use can help prevent infections';
    case 'medStreak':
      return `${param} ${param === 1 ? 'dose' : 'doses'} in a row`;
    case 'vaccination':
      return "Great job! It's important to stay up-to-date on your shots to prevent infections";
    case 'vaccinationsUpToDate':
      return "You're up-to-date on your shots. Wonderful!";
    case 'antibioticsWait':
      return 'You already gave me antibiotics! Wait at least 12 hours for the next dose';
    case 'notFeelingGood':
      return 'I\'m not feeling so good...';
    case 'feelingBetter':
      return 'Thanks, I\'m feeling much better now!';
    default:
      return '';
  }
}
export const defaultPetGameState = {
  hydration: 100,
  pain: { level: 0, lastHadPain: Date.now(), daysWithoutPain: 0 },
  temperature: 68,
  daysWithoutPain: 0,
  antibiotics: { upToDate: false, lastGiven: null, streak: 0 },
  shots: { upToDate: false, lastGiven: null },
  currentTime: Date.now(),
  message: { text: getMessage('welcome'), posted: Date.now() },
  activeInfection: false,

};
const StyledImage = styled.img`
  height: 50px;
  width: 50px;
  border: 2px solid #65EFCF;
  opacity: ${(p) => (p.enabled ? 1 : 0.25)};
  border-radius:10px;
  padding: 5px;
  margin: 5px;
  ${(p) => (p.enabled ? css`
  animation-name: swell;
  animation-playing-state: running;
  animation-duration: 2s;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  

  @keyframes swell {
    from {transform: scale(1.0); opacity: 1.0}
    to {transform: scale(1.05); opacity: 0.8}
  }
  ` : '')}
`;
const Grid = styled.div`
  position: absolute;
  display: inherit;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function maybeGetInfected(state) {
  const vaccinated = state.shots.upToDate;
  const medicated = state.antibiotics.upToDate;
  const hydrated = state.hydration > hydrationThreshold;

  const probability = 1 - (vaccinated * 0.9 + medicated * 0.09 + hydrated * 0.009);
  const random = Math.random();
  const infected = random < probability;
  // console.log({ probability, random, infected });
  return infected;
}

function messageReducer(state, newActiveInfection) {
  if (state.activeInfection && !newActiveInfection) {
    return { text: getMessage('feelingBetter'), posted: Date.now() };
  }
  if (!state.activeInfection && newActiveInfection) {
    return { text: getMessage('notFeelingGood'), posted: Date.now() };
  }
  if (Date.now() - state.message.posted > 5000) {
    return { text: '', posted: null };
  }
  return { ...state.message };
}

export function statReducer(state, action) {
  switch (action.type) {
    case 'GIVE_WATER':
      return {
        ...state,
        hydration: Math.min(100, state.hydration + action.value),
        message: { text: getMessage(`hydration${(state.hydration % 4) + 1}`), posted: Date.now() },
      };
    case 'GIVE_SHOT':
      return {
        ...state,
        shots: { upToDate: true, lastGiven: state.currentTime },
        message:
          { text: getMessage(state.shots.upToDate ? 'vaccinationsUpToDate' : 'vaccination'), posted: Date.now() },
      };
    case 'GIVE_ANTIBIOTICS':
    {
      if (!state.antibiotics.upToDate) {
        return {
          ...state,
          message: { text: getMessage('gaveAntibiotics'), posted: Date.now() },
          antibiotics: { upToDate: true, lastGiven: state.currentTime, streak: state.antibiotics.streak + 1 },
        };
      }
      return { ...state, message: { text: getMessage('antibioticsWait'), posted: Date.now() } };
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
      const newActiveInfection = state.activeInfection ? !(state.hydration === 100 && state.shots.upToDate && state.antibiotics.upToDate)
        : maybeGetInfected(state);
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
        activeInfection: newActiveInfection,
        message: messageReducer(state, newActiveInfection),
      };
    }
    default:
      throw new Error();
  }
}

export default function Game1() {
  const { petGameState: state, setPetGamePollFunction, dispatchPetGameState: dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    setPetGamePollFunction(() => (gameState) => {
      try {
        dispatch({ type: 'ADVANCE_TIME', value: millisecondsPerSecond });
        if (gameState.hydration === 50) {
          return 'getting thirsty';
        }
      } catch (e) {
        console.log(e);
      }
      return null;
    });
  }, [dispatch, setPetGamePollFunction]);

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
        <StyledStat name="Pain" value={`${state.pain.level}/10`} />
        <StyledStat name="Active Infection?" value={`${state.activeInfection ? 'yes' : 'no'}`} alert={state.activeInfection} />
        <StyledStat
          name="Days without pain"
          value={state.pain.daysWithoutPain}
        />
        <StyledStat
          name="Med streak"
          value={getMessage('medStreak', state.antibiotics.streak)}
          alert={state.antibiotics.streak === 0}
        />
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
      <Message>{state.message.text}</Message>

      <Girl
        sick={state.activeInfection}

      >{(state.activeInfection ? (
        <SickGirlSvg
          height={300}
          width={150}
        />
      ) : (
        <GirlSvg
          height={300}
          width={250}
        />
      ))}
      </Girl>
    </Grid>
  );
}
