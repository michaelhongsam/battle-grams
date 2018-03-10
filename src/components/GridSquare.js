import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import TileSlot from './tileSlot'


import { moveTile } from './game'
import ItemTypes from './ItemTypes'

const squareTarget = {
	drop(props, monitor) {
    // let item = monitor.getItem();
		moveTile(props.col, props.row)
	},
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		// isOver: monitor.isOver(),
	}
}

class GridSquare extends Component {
	static propTypes = {
		col: PropTypes.number.isRequired,
		row: PropTypes.number.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		children: PropTypes.node,
	}

	// renderOverlay(color) {
	// 	return (
	// 		<div
	// 			style={{
	// 				position: 'absolute',
	// 				top: 0,
	// 				left: 0,
	// 				height: '100%',
	// 				width: '100%',
	// 				zIndex: 1,
	// 				opacity: 0.5,
	// 				backgroundColor: color,
	// 			}}
	// 		/>
	// 	)
	// }

	render() {
		const { col, row, connectDropTarget, children } = this.props

		return connectDropTarget(
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
				}}
			>
				<TileSlot>{children}</TileSlot>

			</div>,
		)
	}
}

export default DropTarget(ItemTypes.TILE, squareTarget, collect)(GridSquare);
