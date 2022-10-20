import { render } from '@testing-library/react';
import React from 'react';
import './game3.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="card">
        {this.props.cardName}
      </div>
    );
  }
}
export default Card;
