/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */

import React from "react";
import { Box, Flex } from "grape-ui-react";
import Card from "./card";
import "./game3.css";

class Flippr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsSet1: [
        {
          name: "Cell1",
          image: "Cell.png",
          carddisabled: false,
          reFlipCard: false,
        },
        {
          name: "Cell2",
          image: "prevent.jpeg",
          carddisabled: false,
          reFlipCard: false,
        },
        {
          name: "Cell3",
          image: "BloodFlow.jpeg",
          carddisabled: false,
          reFlipCard: false,
        },
        {
          name: "Cell4",
          image: "Triggers.jpg",
          carddisabled: false,
          reFlipCard: false,
        },
      ],
      cardsSet2: [
        {
          name: "Cell5",
          image: "Triggers.jpg",
          carddisabled: false,
          reFlipCard: false,
        },
        {
          name: "Cell6",
          image: "Cell.png",
          carddisabled: false,
          reFlipCard: false,
        },
        {
          name: "Cell7",
          image: "BloodFlow.jpeg",
          carddisabled: false,
          reFlipCard: false,
        },
        {
          name: "Cell8",
          image: "prevent.jpeg",
          carddisabled: false,
          reFlipCard: false,
        },
      ],
      cardCounter: 0,
      cardData: [],
    };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter(t) {
    // capture them in a array and increment the counter only if the front is flipped to back
    // return (t) => {
    this.setState({
      cardData: [
        ...this.state.cardData,
        t.target.id.substring(0, t.target.id.length - 2),
      ],
    });
    if (t.target.innerHTML === "<p></p>") {
      this.setState({ cardCounter: this.state.cardCounter + 1 }, () => {
        if (this.state.cardCounter === 2) {
          // check if cards are different
          if (this.state.cardData[0] !== this.state.cardData[1]) {
            // flip them back and reset counter
            setTimeout(() => {
              const ns1 = [...this.state.cardsSet1];
              const ind = ns1.findIndex(
                (ele) => ele.image === this.state.cardData[0]
              );
              ns1[ind].reFlipCard = true;
              this.setState({ cardsSet1: ns1 });

              const ns2 = [...this.state.cardsSet2];
              const ind2 = ns2.findIndex(
                (ele) => ele.image === this.state.cardData[1]
              );
              ns2[ind2].reFlipCard = true;
              this.setState({ cardsSet2: ns2, cardCounter: 0, cardData: [] });
            }, 1000);
          } else {
            // if count is 2 and the cards are same - then diable them from clicking and reset counter
            const newState1 = [...this.state.cardsSet1];
            const ind = newState1.findIndex(
              (ele) => ele.image === this.state.cardData[0]
            );
            console.log(ind);
            newState1[ind].carddisabled = true;
            console.log(newState1);

            const newState2 = [...this.state.cardsSet2];
            const ind2 = newState2.findIndex(
              (ele) => ele.image === this.state.cardData[1]
            );
            newState2[ind2].carddisabled = true;
            this.setState({
              cardsSet1: newState1,
              cardsSet2: newState2,
              cardCounter: 0,
              cardData: [],
            });
          }
        }
      });
    }
    // };
  }

  render() {
    return (
      <Flex alignSelf="center" maxWidth="500px" maxHeight="800px">
        <Box>
          <div className="cardGroup">
            {this.state.cardsSet1.map((card, index) => (
              <Card
                id={index}
                key={card.name}
                cardName={`${card.image}_1`}
                imageName={card.image}
                recordClickEvent={this.incrementCounter}
                cardDisabled={card.carddisabled}
                reFlipInd={card.reFlipCard}
              />
            ))}
          </div>
          <div className="cardGroup">
            {this.state.cardsSet2.map((card, index) => (
              <Card
                id={index}
                key={card.name}
                cardName={`${card.image}_2`}
                imageName={card.image}
                recordClickEvent={this.incrementCounter}
                cardDisabled={card.carddisabled}
                reFlipInd={card.reFlipCard}
              />
            ))}
          </div>
        </Box>
      </Flex>
    );
  }
}
export default Flippr;
