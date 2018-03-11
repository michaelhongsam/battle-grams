import React, { Component } from 'react';
import GridSquare from './GridSquare';
import Tile from './tile';

import PropTypes from 'prop-types';


export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 8, totalSize: 64 };
    this.renderTile = this.renderTile.bind(this);
    this.renderTileSlot = this.renderTileSlot.bind(this);
  }

  static propTypes = {
    tilePositions:
      PropTypes.object()
        .isRequired,
  }

  renderTileSlot(i) {
    const col = i % this.state.size;
    const row = Math.floor(i / this.state.size)

    return (
      <div key={i}>
        <GridSquare row={row} col={col}>
          {this.renderTile(row, col)}
        </GridSquare>
      </div>
    )
  }

  renderTile(row, col) {
    let grid = this.props.tilePositions.grid;
    let { letter } = grid.filter(tile => {
      return row === tile.row && col === tile.col;
    });
    return letter ? <Tile letter={letter} /> : null;
  }


  render() {
    const slots = [];
    for (let i = 0; i < this.state.totalSize; ++i) {
      slots.push(this.renderTileSlot(i))
    }

  return(
    <div className = "container" >
      <table id="grid">
        {slots}
      </table>
    </div>
  )}
}

