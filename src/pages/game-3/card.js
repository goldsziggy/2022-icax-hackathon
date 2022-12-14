/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import ReactCardFlip from "react-card-flip";

import "./game3.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    // reFliping the cards when they don't match
    if (this.props.reFlipInd !== prevProps.reFlipInd) {
      if (this.props.reFlipInd) {
        console.log("D", this.props.id);
        this.setState({ isFlipped: !this.props.reFlipInd });
      }
    }
  }

  handleChange(e) {
    e.preventDefault();
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ isFlipped: !this.state.isFlipped });
    this.props.recordClickEvent(e);
  }

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        {/* Front Card */}
        <div
          id={this.props.cardName}
          className="card"
          onClick={this.handleChange}
        >
          <p />
        </div>
        {/* Back Card */}
        <div
          className={this.props.cardDisabled ? "card dis" : "card"}
          onClick={this.handleChange}
        >
          <div>
            <img
              value={this.props.cardName}
              className="cardimg"
              src={`${process.env.PUBLIC_URL}/${this.props.imageName}`}
              alt="cell"
            />
          </div>
        </div>
      </ReactCardFlip>
    );
  }
}
Card.propTypes = {
  imageName: PropTypes.string,
  cardName: PropTypes.string,
  recordClickEvent: PropTypes.func,
};
export default Card;
