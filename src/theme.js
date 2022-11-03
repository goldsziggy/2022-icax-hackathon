import { styledHelpers, getGlobalStyles } from "grape-ui-react";
import { css } from "styled-components";

const THEME_MODE = "dark";

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

const colorsDark = {
  primary: "#",
  accent: "#eb9e65",
  red: "#9b1a34",
  black: "#322e4a",
  white: "#dfe5fa",
  error: "#9b1a34",
};

const colorsLight = {
  primary: "#8755D9",
  accent: "#eb9e65",
  red: "#9b1a34",
  black: "#383838",
  white: "#F8F8FF",
  error: "#9b1a34",
};

const pageStylesDark = {
  layout: {
    backgroundColor: colorsDark.white,
    topbarBackgroundColor: colorsDark.black,
    sidebarBackgroundColor: colorsDark.black,
    sideBarFontColor: colorsDark.white,
    toolbarButtonColor: colorsDark.white,
    toolbarButtonColorOnHover: colorsDark.black,
    sidebarOpacity: "99",
  },
};

const pageStylesLight = {
  layout: {
    backgroundColor: colorsLight.white,
    topbarBackgroundColor: colorsLight.primary,
    sidebarBackgroundColor: colorsLight.black,
    sideBarFontColor: colorsLight.white,
    toolbarButtonColor: colorsLight.white,
    toolbarButtonColorOnHover: colorsLight.black,
    sidebarOpacity: "99",
  },
};

const colors = THEME_MODE === "dark" ? colorsDark : colorsLight;
const pageStyles = THEME_MODE === "dark" ? pageStylesDark : pageStylesLight;

export default {
  buttons: {
    ...styledHelpers.buttonThemes(),
  },
  colors,
  pageStyles,
  media: { mobile, tablet, desktop, laptop },
};
