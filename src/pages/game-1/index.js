/* eslint-disable react/prop-types */
import { Button, Image } from 'grape-ui-react';
import React from 'react';
import styled from 'styled-components';
import GirlSvg from './girl1.svg';
import GlassOfWater from './glass-of-water.svg';
import Syringe from './syringe.svg';
import Pills from './pills.svg';

function giveWater() {
  alert('good job! drink lots of water');
}
function giveShot() {
  alert('good job! get your shots');
}
function giveAntibiotics() {
  alert('good job! an antibiotic a day keeps the doctor away');
}

const Girl = styled.img``;

function Stat({ name, value }) {
  return (
    <>
      <div>{name}:</div>
      <div>{value}</div>
    </>
  );
}
const StyledStat = styled(Stat)`
  display: grid;
`;
const StyledImage = styled(Image)`
  height: 80px;
  width: 80px;
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
`;

export default function Game1() {
  function statReducer(state, action) {
    if (!action) {
      return state;
    }
    switch (action.type) {
      case 'GIVE_WATER':
        return { ...state, hydration: state.hydration + action.value };
      case 'GIVE_SHOT':
        return { ...state, value: state.value - 1 };
      case 'GIVE_ANTIBIOTIC':
        return { ...state, value: state.value - 1 };
      default:
        throw new Error();
    }
  }
  const [stats, dispatch] = React.useReducer(statReducer, {
    hydration: 100,
    pain: 0,
    temperature: 68,
    daysWithoutPain: 0,
    medStreak: 0,
  });
  const buttons = (
    <>
      <StyledImage
        src={GlassOfWater}
        onClick={() => {
          dispatch({ type: 'GIVE_WATER', value: 10 });
        }}
      />
      <StyledImage
        onClick={() => {
          dispatch({ type: 'GIVE_SHOT', value: 1 });
        }}
        src={Syringe}
      />
      <StyledImage
        src={Pills}
        onClick={() => {
          dispatch({ type: 'GIVE_ANTIBIOTICS', value: 1 });
        }}
      />
    </>
  );
  const Buttons = styled.div``;
  const Stats = styled.div`
    padding: 30px;
    font-family: Skia;
    font-size: 18px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  `;

  return (
    <>
      <Stats>
        <StyledStat name="Hydration" value={`${stats.hydration}%`} />
        <StyledStat name="Pain" value={`${stats.pain}`} />
        <StyledStat name="Temperature" value={`${stats.temperature}°F`} />
        <StyledStat name="Days without pain" value={stats.daysWithoutPain} />
        <StyledStat name="Med streak" value={stats.medStreak} />
      </Stats>
      <Buttons>{buttons}</Buttons>
      <Girl src={GirlSvg} />
    </>
  );
}
