import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { updateGrid } from '../store';
import {connect} from 'react-redux';

import Tile from './tile';
import GridSquare from './GridSquare';


class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 8,
    }
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
    let { grid } = this.props;
    let tile = grid.find(function (ele){
      return (row === ele.row && col === ele.col);
    });
    // return (letter) ? <Tile letter={letter} row={row} col={col} /> : null;
    if (tile) {
      return (
        <Tile letter={tile.letter} row={row} col={col} />
      )
    }
    else {
      return null
    }
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
  grid: PropTypes.array,
}

const mapState = state => ({
  grid: state.grid
})

const mapDispatch = null;
// const mapDispatch = dispatch => ({
//   somefunc: thing => dispatch(somefunc(thing))
// })

export default /*withRouter(*/connect(mapState, mapDispatch)(Grid);
