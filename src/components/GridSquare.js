import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

import TileSlot from './tileSlot'
import { moveTile } from '../utils/game';

const squareTarget = {
	drop(props, monitor) {
		let source = monitor.getItem();
		let target = {
			col: props.col,
			row: props.row,
		}
		console.log('source: ', source, 'target: ', target)
		moveTile(source, target)
		return {
			row: target.row,
			col: target.col,
		}
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
