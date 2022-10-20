import './global.css';
import React, { useMemo, useState, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Box,
  Flex,
  Button,
  List,
  ListItem,
  Card,
  // Link,
  Header,
  Toolbar,
} from 'grape-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AppContext from './app-context';

const ToolbarButton = styled(Button)``;
const BaseBox = styled(Box)``;
const CustomList = styled(List)`
a {
  color: #F8F8FF
}
`;

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

const NotificationContainer = styled(Box)`
position: absolute;`;
const Notification = styled(Card)``;

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
};

export default function Layout() {
  const { notifications } = useContext(AppContext);
  const [isMenuVisibile, setIsMenuVisibile] = useState(false);

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
            <CustomList unstyled>
              <ListItem mt="1rem">
                <Link to="/1">Game 1</Link>
              </ListItem>
              <ListItem mt="1rem">
                <Link to="/2">Game 2</Link>
              </ListItem>
              <ListItem mt="1rem">
                <Link to="/3">Game 3</Link>
              </ListItem>
              <ListItem mt="1rem">
                <Link to="/4">Water Clicker</Link>
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
        <NotificationContainer>
          {notifications.map((notification) => (
            <Notification>{notification.message}</Notification>))}
        </NotificationContainer>

      </FlexWrapper>
    </FlexWrapper>

  );
}
