import './global.css';
import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {
  Box,
  Flex,
  Button,
  List,
  ListItem,
  Link,
  Header,
  Toolbar,
} from 'grape-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AppContext from './app-context';

const ToolbarButton = styled(Button)``;
const BaseBox = styled(Box)``;

BaseBox.defaultProps = {
  flex: '1 100%',
  p: 3,
};
const BoxAside = styled(BaseBox)`
  background: ${(props) => props.bg};
`;

const FlexWrapper = styled(Flex)`
  text-align: center;
`;

const leftArea = (isMenuVisibile, setIsMenuVisibile) => (
  <Flex alignItems="center" ml={-3}>
    <ToolbarButton onClick={() => setIsMenuVisibile(!isMenuVisibile)}>
      <FontAwesomeIcon icon={faBars} />
    </ToolbarButton>
    <Header.h5
      color="white"
      mb="0"
    >
      Sickle Cell App
    </Header.h5>
  </Flex>
);

FlexWrapper.defaultProps = {
  flexDirection: 'column',
  // flexWrap: 'wrap',
};

export default function Layout() {
  const [example, setExample] = useState(undefined);
  const [isMenuVisibile, setIsMenuVisibile] = useState(false);

  const sharedState = useMemo(() => ({
    example,
    setExample,
  }), [example]);

  return (
    <FlexWrapper className="layout" id="layout" alignItems="stretch">
      <Toolbar
        bg="#8755D9"
        leftArea={leftArea(isMenuVisibile, setIsMenuVisibile)}
      />
      <FlexWrapper
        id="parent-holder"
        flex="1"
        order="1"
        justifyContent="center"
        flexDirection="row"

      >
        {isMenuVisibile ? (
          <BoxAside
            bg="#383838"
            maxWidth="25%"
          >
            <List>
              <ListItem>
                <Link
                  href="/2022-icax-hackathon/1"
                >
                  Game 1
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="/2022-icax-hackathon/2"
                >
                  Game 2
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="/2022-icax-hackathon/3"
                >
                  Game 3
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="/2022-icax-hackathon/4"
                >
                  Game 4
                </Link>
              </ListItem>
            </List>
          </BoxAside>
        ) : null}
        <AppContext.Provider value={sharedState}>
          <FlexWrapper
            id="common-main"
            flex="1"
            order="1"
            justifyContent="center"
          >
            <Outlet />
          </FlexWrapper>
        </AppContext.Provider>
      </FlexWrapper>
    </FlexWrapper>

  );
}
