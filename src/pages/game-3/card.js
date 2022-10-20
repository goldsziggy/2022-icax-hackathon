import React from 'react';
import PropTypes from 'prop-types';

import './game3.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange(e) {
    console.log(process.env.PUBLIC_URL);
    console.log('D testing onClick event');
  }

  render() {
    return (
      <div className="card" onClick={this.handleChange}>
        <div>
          <img className="cardimg" src={`${process.env.PUBLIC_URL}/${this.props.imageName}`} alt="cell" />
        </div>

      </div>
    );
  }
}
Card.propTypes = {
  imageNeme: PropTypes.string,
};
export default Card;
