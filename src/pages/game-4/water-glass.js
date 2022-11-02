import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as WaterGlass } from "../../assets/waterglass.svg";

const WaterGlassContainer = styled.div`
  ${(props) => {
    if (props.currentFillState === 3) {
      return css`
        .cls-0,
        .cls-1,
        .cls-2,
        ellipse,
        #text {
          transition-delay: 0.5s;
          transform: matrix(1, 0, 0, 1, 0, 0);
        }
      `;
    }
    if (props.currentFillState === 2) {
      return css`
        .cls-0,
        .cls-1,
        .cls-2,
        ellipse,
        #text {
          transition-delay: 0.5s;
          transform: matrix(0.95, 0, 0, 0.75, 3, 30);
        }
      `;
    }
    if (props.currentFillState === 1) {
      return css`
        .cls-0,
        .cls-1,
        .cls-2,
        ellipse,
        #text {
          transition-delay: 0.5s;
          transform: matrix(0.9, 0, 0, 0.33, 6, 81);
        }
      `;
    }

    return css`
      .cls-0,
      .cls-1,
      .cls-2,
      ellipse,
      #text {
        transition-delay: 0.5s;
        transform: matrix(0.75, 0, 0, 0.05, 14, 115);
      }
    `;
  }}
`;

export default function WaterGlassSvg({ onClick, currentFillState }) {
  return (
    <WaterGlassContainer currentFillState={currentFillState}>
      <WaterGlass onClick={onClick} />
    </WaterGlassContainer>
  );
}
