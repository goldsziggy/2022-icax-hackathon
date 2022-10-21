import React from 'react';
import Card from './card';
import './game3.css';

class Game3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsSet1: [
        { name: 'Cell1', image: 'Cell.png', carddisabled: false, reFlipCard: false},
        { name: 'Cell2', image: 'prevent.jpeg', carddisabled: false, reFlipCard: false },
        { name: 'Cell3', image: 'BloodFlow.jpeg', carddisabled: false, reFlipCard: false },
        { name: 'Cell4', image: 'Triggers.jpg', carddisabled: false, reFlipCard: false },
      ],
      cardsSet2: [
        { name: 'Cell5', image: 'Triggers.jpg', carddisabled: false, reFlipCard: false },
        { name: 'Cell6', image: 'Cell.png', carddisabled: false, reFlipCard: false},
        { name: 'Cell7', image: 'BloodFlow.jpeg', carddisabled: false, reFlipCard: false },
        { name: 'Cell8', image: 'prevent.jpeg', carddisabled: false, reFlipCard: false },
      ],
cardCounter: 0,
cardData: [],
    };

  }

  incrementCounter = (t)=> {
    //capture them in a array and increment the counter only if the front is flipped to back
    this.setState({cardData: [...this.state.cardData, t.target.id.substring(0,t.target.id.length -2) ]})
    if(t.target.innerHTML === '<p>Test</p>') {
      this.setState({cardCounter: this.state.cardCounter +1}, () => {
        if(this.state.cardCounter == 2) {
          // check if cards are different
          if(this.state.cardData[0] !== this.state.cardData[1]) {
            // flip them back and reset counter
            console.log("testing")
           let ns1 = [... this.state.cardsSet1];
           let ind = ns1.findIndex((ele) => ele.image === this.state.cardData[0])
           ns1[ind].reFlipCard = true;
           
           let ns2 = [... this.state.cardsSet2];
           let ind2 = ns2.findIndex((ele) => ele.image === this.state.cardData[1])
           ns2[ind2].reFlipCard = true;
           this.setState({cardsSet1: ns1, cardsSet2: ns2, cardCounter: 0, cardData: []})
  
          } else{
             // if count is 2 and the cards are same - then diable them from clicking and reset counter
            let newState1 = [... this.state.cardsSet1];
            let ind = newState1.findIndex((ele) => ele.image === this.state.cardData[0])
            newState1[ind].carddisabled = true;
            console.log(newState1)

            let newState2 = [... this.state.cardsSet2];
            let ind2 = newState2.findIndex((ele) => ele.image === this.state.cardData[1])
            newState2[ind2].carddisabled = true;
            this.setState({cardsSet1: newState1, cardsSet2: newState2, cardCounter: 0, cardData: []})
            
          }
  
        }
       
      })
    
     
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: '#F9E557', height: '100vh' }}>

        <div className="cardGroup">
          {this.state.cardsSet1.map((card,index) => (

            <Card 
            id={index} 
            cardName={`${card.image}_1`} 
            imageName={card.image} 
            recordClickEvent={this.incrementCounter} 
            reFlip={this.state.ReFlipCard}
            cardDisabled={card.carddisabled}
            reFlipInd={card.reFlipCard}
            />
          ))}
        </div>
        <div className="cardGroup">
          {this.state.cardsSet2.map((card, index) => (

            <Card 
            id={index} 
            cardName={`${card.image}_2`} 
            imageName={card.image} 
            recordClickEvent={this.incrementCounter} 
            reFlip={this.state.ReFlipCard}
            cardDisabled={card.carddisabled}
            reFlipInd={card.reFlipCard}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Game3;
