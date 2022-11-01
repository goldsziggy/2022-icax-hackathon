import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as EKG } from "./ekg.svg";
// https://codepen.io/sjero/pen/BdVGrB

const StyledEKG = styled(EKG)`
  & {
    max-width: 470px;
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
    transition: all 0.5s ease-in-out;
  }

  .ekg {
    fill: none;
    stroke: ${({ theme: t }) => t.colors.red};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: miter;
    opacity: 0;
    stroke-dashoffset: 1000;
    stroke-dasharray: 1000;
    animation: ekg 1.5s linear forwards infinite;

    ${({ theme: t }) =>
      t.media.mobile(css`
        stroke-width: 0.5rem;
      `)}
  }

  @keyframes ekg {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      stroke-dashoffset: 2000;
    }
    99% {
      opacity: 0;
      stroke-dashoffset: 3000;
      stroke: ${({ theme: t }) => t.colors.white};
    }
    100% {
      stroke-dashoffset: 1000;
    }
  }
`;

export default function AnimatedEKG() {
  return <StyledEKG />;
}
