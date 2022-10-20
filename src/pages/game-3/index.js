import React from 'react';
import Card from './card';
import './game3.css';

class Game3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsSet1: [
        { name: 'Cell1', image: 'Cell.png' },
        { name: 'Cell2', image: 'prevent.jpeg' },
        { name: 'Cell3', image: 'BloodFlow.jpeg' },
        { name: 'Cell4', image: 'Triggers.jpg' },
      ],
      cardsSet2: [
        { name: 'Cell5', image: 'Triggers.jpg' },
        { name: 'Cell6', image: 'Cell.png' },
        { name: 'Cell7', image: 'BloodFlow.jpeg' },
        { name: 'Cell8', image: 'prevent.jpeg' },
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
