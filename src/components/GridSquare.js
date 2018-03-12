import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

import TileSlot from './tileSlot'
import store, { updateGrid, updateBank } from '../store';

function moveTile (source, target) {
	console.log('target: ', target);
	console.log('source: ', source);

  let modifiedBank = store.getState().bank;
  let modifiedGrid = store.getState().grid;

	// add tile
	if (target && target.row === 99 && source.row === 99) { // source is from bank, target is in bank
		console.log('bank to bank')

		if (target.letter) {
			modifiedBank[source.col] = target;
		} else {
			modifiedBank[source.col] = null;
		}
		modifiedBank[target.col] = source;
		
		store.dispatch(updateBank(modifiedBank));

	} else if (target && target.row !== 99 && source.row === 99) { // source is from bank, target is in grid
		console.log('bank to grid')
		let gridIdx = modifiedGrid.findIndex( ele => {
      		return ele.row === target.row && ele.col === target.col;
		})
		modifiedGrid[gridIdx].letter = source.letter;

		if (target.letter) {
			modifiedBank[source.col] = target;
		} else {
			modifiedBank[source.col] = null;
		}
		store.dispatch(updateGrid(modifiedGrid));
		store.dispatch(updateBank(modifiedBank));

  	} else if (target && target.row !== 99 && source.row !== 99) {
		console.log('grid to grid')
		let gridIdxTarget = modifiedGrid.findIndex( ele => {
			return ele.row === target.row && ele.col === target.col;
		})
		let gridIdxSource = modifiedGrid.findIndex( ele => {
			return ele.row === source.row && ele.col === source.col;
		})

		modifiedGrid[gridIdxTarget].letter = source.letter;
		modifiedGrid[gridIdxSource].letter = target.letter;
		store.dispatch(updateGrid(modifiedGrid));

	} else {
		console.log('grid to bank')
		let fromGridIdx = modifiedGrid.findIndex( ele => {
			return ele.row === source.row && ele.col === source.col;
		})
		modifiedGrid[fromGridIdx].letter = target.letter;
		modifiedBank[target.col] = source;
		store.dispatch(updateGrid(modifiedGrid));
		store.dispatch(updateBank(modifiedBank));
	}
}

const squareTarget = {
	drop(props, monitor) {
		let source = monitor.getItem();
		let target = {
			col: props.col,
			row: props.row,
			letter: props.letter
		}

		moveTile(source, target)
		return target;
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
