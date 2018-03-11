import React /*, { Component }*/ from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { updateGrid } from '../store';
import {connect} from 'react-redux';

import Tile from './tile';
import GridSquare from './GridSquare';

function renderTileSlot(row, col, props) {
  return (
    <div key={`${row} - ${col}`}>
      <GridSquare row={row} col={col}>
        {renderTile(row, col, props)}
      </GridSquare>
    </div>
  )
}

function renderTile(row, col, props) {
  let { grid } = props;
  let tile = grid.find(function (ele){
    return (row === ele.row && col === ele.col);
  });
  // return (letter) ? <Tile letter={letter} row={row} col={col} /> : null;
  if (tile && tile.letter) {
    return (
      <Tile letter={tile.letter} row={row} col={col} />
    )
  }
  else {
    return null
  }
}
function Grid (props) {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     size: 8,
  //   }
  //   this.renderTile = this.renderTile.bind(this);
  //   this.renderTileSlot = this.renderTileSlot.bind(this);
  // }




  // render() {
    const columns = [];
    let head = [<th key="spacer" />];
    for (let col = 0; col < 8; ++col) {
      let columnID = `col ${col}`;
      let cell = [
        <td key={`row ${col}`}>
          <span>{`row ${col}`}</span>
        </td>];
      head.push(
        <th key={columnID} id={columnID}>
          {columnID}
        </th>);

      for (let row = 0; row < 8; ++row) {
        let cellID = `row ${row} - col ${col}`;
        cell.push(
          <td key={cellID} id={cellID}>
            {renderTileSlot(row, col, props)}
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
// }

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

export default withRouter(connect(mapState, mapDispatch)(Grid));
