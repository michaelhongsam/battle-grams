import React, { Component } from 'react';

export default class TileSocket extends Component {
  constructor(props) {
    super(props);
    this.state = { letter: 'A' };
  }
  render() {
    return (
      <div className="tile-socket">
        {`${this.state.letter}` }
      </div>
    )
  }
}
