import React from 'react';
import bubble from './bubble.png';
import './game3.css';

export default function Game3() {
  return (
    <div style={{ backgroundColor: '#F9E557' }}>
      <h1>Durga's test bubble game</h1>
      <img src={bubble} className="bubble" alt="bubble" />

    </div>

  );
}

// pre flipping
//   render() {
//     return (
//       <div className="card" onClick={this.handleChange}>
//         <div>
//           <img value={this.props.cardName} className="cardimg" src={`${process.env.PUBLIC_URL}/${this.props.imageName}`} alt="cell" />
//         </div>

//       </div>
//     );
//   }
