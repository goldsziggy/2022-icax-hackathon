import React from 'react';
import Card from './card';
import './game3.css';

class Game3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsSet1: [
        { name: 'Cell', image: 'Cell.png' },
        { name: 'Test', image: 'prevent.jpeg' },
        { name: 'Test', image: 'BloodFlow.jpeg' },
        { name: 'Test', image: 'Triggers.jpg' },
      ],
      cardsSet2: [
        { name: 'Test', image: 'Triggers.jpg' },
        { name: 'Test', image: 'Cell.png' },
        { name: 'Test', image: 'BloodFlow.jpeg' },
        { name: 'Test', image: 'prevent.jpeg' },
      ],
      CardClickCount: 0,

    };
  }

  render() {
    return (
      <div style={{ backgroundColor: '#F9E557', height: '100vh' }}>

        <div className="cardGroup">
          {this.state.cardsSet1.map((card) => (

            <Card cardName={card.name} imageName={card.image} />
          ))}
        </div>
        <div className="cardGroup">
          {this.state.cardsSet2.map((card) => (

            <Card cardName={card.name} imageName={card.image} />
          ))}
        </div>

      </div>

    );
  }
}
export default Game3;
