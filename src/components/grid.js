import React, { Component } from 'react';
import GridSquare from './GridSquare';
import Tile from './tile';

import PropTypes from 'prop-types';


export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 8, totalSize: 64 };
  }

  static propTypes = {
    arrTilePositions:
      PropTypes.arrayOf(
        PropTypes.object.isRequired)
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
    const { tileRow, tileCol, letter } = this.props.arrTilePositions.filter(tilePos => tilePos.row === row && tilePos.col === col);

    const isTileHere = row === tileRow && col === tileCol;

    return isTileHere ? <Tile letter={letter} /> : null

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
  )
  }
}

