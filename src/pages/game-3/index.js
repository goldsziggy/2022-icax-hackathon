import React from 'react';
import { Box, Flex } from 'grape-ui-react';
import Card from './card';
import './game3.css';

class Game3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [1, 2, 3, 4],
    };
  }

  componentDidMount() {
    console.log('component just mounted - have the bubble at the bottom of the page');
  }

  render() {
    return (
      <div style={{ backgroundColor: '#F9E557', height: '100vh' }}>
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          {this.state.cards.map((card) => (

            <Card cardName={card} />
          ))}

        </Flex>

      </div>
    );
  }
}
export default Game3;
