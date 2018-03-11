import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

import TileSlot from './tileSlot'
import store, { updateGrid, updateBank } from '../store';

function moveTile (source, target) {

  let modifiedBank = store.getState().bank;
  let modifiedGrid = store.getState().grid;

  // add tile
  if (target.row === 99) { // target going into bank
    modifiedBank[target.col] = target.letter;
  }
  else // target goes into grid
  {
    let gridIdx = modifiedGrid.findIndex( ele => {
      return ele.row === target.row && ele.col === target.col;
    })
    modifiedGrid[gridIdx] = { letter: source.letter, row: target.row, col: target.col };
  }

  // remove tile
  if (source.row === 99) { // remove source from bank
    modifiedBank[source.col] = null;
  }
  else { // remove source from grid
    let gridIdx = modifiedGrid.findIndex( ele => {
      return ele.row === source.row && ele.col === source.col;
    })
    modifiedGrid[gridIdx] = { letter: null, row: source.row, col: source.col };
	}
	console.log('modifiedGrid: ', modifiedGrid)
	console.log('modifiedBarn: ', modifiedBank)

	store.dispatch(updateGrid(modifiedGrid));
	store.dispatch(updateBank(modifiedBank));
}

const squareTarget = {
	drop(props, monitor) {
		let source = monitor.getItem();
		let target = {
			col: props.col,
			row: props.row,
		}
		console.log('source: ', source, 'target: ', target)
		moveTile(source, target)
	},
}

function collect(connect) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

class GridSquare extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		children: PropTypes.node,
	}

	render() {
		const { connectDropTarget, children } = this.props

		return connectDropTarget(
			<div>
				<TileSlot>{children}</TileSlot>
			</div>,
		)
	}
}

export default DropTarget(ItemTypes.TILE, squareTarget, collect)(GridSquare);
