import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import store from '../store';


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
class Grid extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount () {
		this.unsubscribeFromRedux = store.subscribe(() => { // VANILLA REDUX
			this.setState({
				grid: store.getState().grid // VANILLA REDUX
			})
		})
	}

	componentWillUnmount () {
		this.unsubscribeFromRedux() // VANILLA REDUX
	}




  render() {
    const columns = [];
    let head = [<th key="spacer" />];
    for (let row = 0; row < 8; ++row) {
      let columnID = `col ${row}`;
      let cell = [
        <td key={`row ${row}`}>
          <span>{`row ${row}`}</span>
        </td>];
      head.push(
        <th key={columnID} id={columnID}>
          {columnID}
        </th>);

      for (let col = 0; col < 8; ++col) {
        let cellID = `row ${row} - col ${col}`;
        cell.push(
          <td key={cellID} id={cellID}>
            {renderTileSlot(row, col, this.props)}
          </td>);
      }
      columns.push(
        <tr key={row} id={columnID}>
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

export default withRouter(connect(mapState, mapDispatch)(Grid));
