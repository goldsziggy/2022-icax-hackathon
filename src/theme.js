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

const colors = {
  primary: "#",
  accent: "#eb9e65",
  red: "#9b1a34",
  black: "#322e4a",
  white: "#dfe5fa",
  error: "#9b1a34",
};

const pageStyles = {
  layout: {
    backgroundColor: colors.white,
    topbarBackgroundColor: colors.black,
    sidebarBackgroundColor: colors.black,
    sideBarFontColor: colors.white,
    toolbarButtonColor: colors.white,
    toolbarButtonColorOnHover: colors.black,
    sidebarOpacity: "99",
  },
};

export default {
  buttons: {
    ...styledHelpers.buttonThemes(),
  },
  colors,
  pageStyles,
  media: { mobile, tablet, desktop, laptop },
};
