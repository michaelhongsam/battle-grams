import React , { Component } from 'react';
import PropTypes from 'prop-types';

import store, { updateGrid } from '../store';
import { connect } from 'react-redux';

import Tile from './tile';
import GridSquare from './GridSquare';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.renderTileSlot = this.renderTileSlot.bind(this);
  }

  componentDidMount () {
      this.unsubscribeFromRedux = store.subscribe(() => {
          this.setState({ grid: store.getState().grid })
      })
    }

  componentWillUnmount () {
    this.unsubscribeFromRedux()
  }

  renderTileSlot(row, col, props) {
    let indexNum = ((row*8)+col) % 64;
  
    let { grid } = props;
    let tile = grid[indexNum];
  
    if (tile && tile.letter) {
      console.log('hit in grid: ', tile.letter);
      return (
        <div key={`${row} - ${col}`}>
          <GridSquare row={row} col={col} letter={tile.letter}>
            <Tile row={row} col={col} letter={tile.letter} />
          </GridSquare>
        </div>
      )
    } else {
      // console.log('hit else: ');
      return (
        <div key={`${row} - ${col}`}>
          <GridSquare row={row} col={col} letter={null} />
        </div>
      )
    }
  }

  render() {
    const columns = [];
    let head = [<th key="spacer" />];
    for (let col = 0; col < 8; ++col) {
      let columnID = `col ${col}`;
      let cell = [
        <td key={`row ${col}`}>
          <span>{`row ${col}`}</span>
        </td>];
      
      // let cell = [];

      head.push(
        <th key={columnID} id={columnID}>
          {columnID}
        </th>);

      for (let row = 0; row < 8; ++row) {
        let cellID = `row ${row} - col ${col}`;

        cell.push(
          <td key={cellID} id={cellID}>
            {this.renderTileSlot(row, col, this.props)}
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

const mapState = ({ grid }) => ({ grid })

const mapDispatch = null;
// const mapDispatch = dispatch => ({
//   viewGrid(grid) {
//     dispatch(updateGrid(grid))
//   }
// })

export default connect(mapState, mapDispatch)(Grid);
