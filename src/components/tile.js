import React, { Component } from 'react';

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = { letter: this.props.value };
  }
  render() {
    return (
      <div className="tile-socket">
        {`${this.state.letter}` }
      </div>
    )
  }
}
