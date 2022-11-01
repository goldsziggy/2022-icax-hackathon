import { styledHelpers, getGlobalStyles } from "grape-ui-react";
import { css } from "styled-components";

const global = getGlobalStyles();

const mobile = (inner) => css`
  @media (max-width: ${global.breakpoints.sm}) {
    ${inner};
  }
`;
const tablet = (inner) => css`
  @media (max-width: ${global.breakpoints.md}) {
    ${inner};
  }
`;
const desktop = (inner) => css`
  @media (max-width: ${global.breakpoints.xl}) {
    ${inner};
  }
`;
const laptop = (inner) => css`
  @media (max-width: ${global.breakpoints.lg}) {
    ${inner};
  }
`;

const theme = {
  buttons: {
    ...styledHelpers.buttonThemes(),
  },
  colors: {
    primary: "#",
    accent: "#eb9e65",
    red: "#9b1a34",
    black: "#322e4a",
    white: "#dfe5fa",
    error: "#9b1a34",
  },
  media: { mobile, tablet, desktop, laptop },
};

export default theme;
