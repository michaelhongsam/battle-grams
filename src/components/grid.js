import React, { Component } from 'react';
import GridSquare from './GridSquare';
import Tile from './tile';
// import TileSlot from './tileSlot';

import PropTypes from 'prop-types';


export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 8, totalSize: 64 };
    this.renderTile = this.renderTile.bind(this);
    this.renderTileSlot = this.renderTileSlot.bind(this);
  }

  renderTileSlot(row, col) {
    return (
      <div key={`${row} - ${col}`}>
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
    return letter ? <Tile letter={letter} row={row} col={col} /> : null;
  }


  render() {
    const columns = [];
    let head = [<th key="spacer" />];
    for (let col = 0; col < this.state.size; ++col) {
      let columnID = `col ${col}`;
      let cell = [
        <td key={`row ${col}`}>
          <span>{`row ${col}`}</span>
        </td>];
      head.push(
        <th key={columnID} id={columnID}>
          {columnID}
        </th>);

      for (let row = 0; row < this.state.size; ++row) {
        let cellID = `row ${row} - col ${col}`;
        cell.push(
          <td key={cellID} id={cellID}>
            {this.renderTileSlot(row, col)}
          </td>);
      }
      columns.push(
        <tr key={col} id={columnID}>
          {cell}
        </tr>
      );
    }

    return (
      <div className="container" >
        <table id="grid">
          <thead>
            <tr>
              {head}
            </tr>
          </thead>
          <tbody>
            {columns}
          </tbody>
        </table>
      </div>
    )
  }
}

Grid.propTypes = {
  tilePositions: PropTypes.object,
}
