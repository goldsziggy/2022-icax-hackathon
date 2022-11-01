/* eslint-disable react/jsx-pascal-case */
import "./global.css";
import React, { useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Flex,
  Button,
  List,
  ListItem,
  Header,
  Toolbar,
} from "grape-ui-react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AppContext from "./app-context";
import NotificationContainer from "./notification-container";
import theme from "./theme";
import AnimatedEKG from "./assets/animated-ekg";

const CustomSelect = styled(Select)``;
const ToolbarButton = styled(Button)`
  color: ${({ theme: t }) => t.colors.white};
  &:hover {
    color: ${({ theme: t }) => t.colors.black};
  }
`;
const BaseBox = styled(Box)``;
const CustomList = styled(List)`
  li {
    padding: 8px;
    border: none;

    a {
      color: ${({ theme: t }) => t.colors.white};
    }
    // &:hover {
    //   a {
    //     color: ${({ theme: t }) => t.colors.black};
    //   }

    //   background-color: ${({ theme: t }) => t.colors.white};
    // }
  }
`;

BaseBox.defaultProps = {
  flex: "1 100%",
  p: 3,
};
const BoxAside = styled(BaseBox)`
  background: ${({ theme: t }) => t.colors.black}99;
`;

const FlexWrapper = styled(Flex)`
  text-align: center;
  background: ${({ theme: t }) => t.colors.white};
`;

const SVGContainer = styled(Flex)`
  height: 100%;
`;

const leftArea = (isMenuVisibile, setIsMenuVisibile) => (
  <Flex alignItems="center" ml={-3}>
    <ToolbarButton onClick={() => setIsMenuVisibile(!isMenuVisibile)}>
      <FontAwesomeIcon icon={faBars} />
    </ToolbarButton>
    <Header.h5 color="white" mb="0">
      S.C.K.L.R
    </Header.h5>
  </Flex>
);

const centerArea = () => (
  <SVGContainer alignItems="center" justifyContent="center">
    <AnimatedEKG />
  </SVGContainer>
);

const langOptions = [
  { label: "English", value: "eng" },
  { label: "Espanol", value: "esp" },
];

const rightArea = (language, setLanguage) => (
  <Flex alignItems="center" ml={-3}>
    <CustomSelect
      onChange={(e) => {
        console.log(e);
        setLanguage(e.value);
      }}
      options={langOptions}
      value={langOptions.filter((l) => l.value === language)}
    />
  </Flex>
);

FlexWrapper.defaultProps = {
  flexDirection: "column",
};

export default function Layout() {
  const { setLanguage, language } = useContext(AppContext);
  const [isMenuVisibile, setIsMenuVisibile] = useState(false);

  return (
    <FlexWrapper className="layout" id="layout" alignItems="stretch">
      <Toolbar
        bg={theme.colors.black}
        leftArea={leftArea(isMenuVisibile, setIsMenuVisibile)}
        rightArea={rightArea(language, setLanguage)}
        centerArea={centerArea()}
      />
      <FlexWrapper
        id="parent-holder"
        flex="1"
        order="1"
        justifyContent="center"
        flexDirection="row"
      >
        {isMenuVisibile ? (
          <BoxAside bg="#383838" maxWidth="25%">
            <CustomList unstyled>
              <ListItem mt="1rem">
                <Link
                  to="/1"
                  onClick={() => {
                    setIsMenuVisibile(false);
                  }}
                >
                  Doctr
                </Link>
              </ListItem>
              <ListItem mt="1rem">
                <Link
                  to="/2"
                  onClick={() => {
                    setIsMenuVisibile(false);
                  }}
                >
                  Quizr
                </Link>
              </ListItem>
              <ListItem mt="1rem">
                <Link
                  to="/3"
                  onClick={() => {
                    setIsMenuVisibile(false);
                  }}
                >
                  Flippr
                </Link>
              </ListItem>
              <ListItem mt="1rem">
                <Link
                  to="/4"
                  onClick={() => {
                    setIsMenuVisibile(false);
                  }}
                >
                  Clickr
                </Link>
              </ListItem>
              <ListItem mt="1rem">
                <Link
                  to="/5"
                  onClick={() => {
                    setIsMenuVisibile(false);
                  }}
                >
                  Wordlr
                </Link>
              </ListItem>
            </CustomList>
          </BoxAside>
        ) : null}

        <FlexWrapper
          id="common-main"
          flex="1"
          order="1"
          justifyContent="center"
        >
          <Outlet />
        </FlexWrapper>
      </FlexWrapper>
      <NotificationContainer />
    </FlexWrapper>
  );
}
