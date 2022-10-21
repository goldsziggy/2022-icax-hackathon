import React from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';

import './game3.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
    console.log(e.target);
    this.props.recordClickEvent(e);
  }

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        {/* Front Card */}
        <div id={this.props.cardName} className="card" onClick={this.handleChange}>
          <p>Test</p>
        </div>
        {/* Back Card */}
        <div className={this.props.cardDisabled ? 'card dis' : 'card'} onClick={this.handleChange}>
          <div>
            <img value={this.props.cardName} className="cardimg" src={`${process.env.PUBLIC_URL}/${this.props.imageName}`} alt="cell" />
          </div>

        </div>
      </ReactCardFlip>

    );
  }
}
Card.propTypes = {
  imageNeme: PropTypes.string,
  cardName: PropTypes.string,
  recordClickEvent: PropTypes.func,
};
export default Card;
