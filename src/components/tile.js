import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const tileSource = {
	beginDrag(props) {
		return {
			letter: props.letter,
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log(dropResult)

		if (dropResult) {
			alert(`You dropped ${item.letter} into ${dropResult.cellID}!`) // eslint-disable-line no-alert
		}
	},
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  letter: PropTypes.string.isRequired,
}
class Tile extends Component {


  constructor(props) {
    super(props);
    this.state = { letter: this.props.value };
  }
  render() {
    const { letter, connectDragSource } = this.props

    return connectDragSource(
      <div className="tile">
        <span>{letter}</span>
      </div>
    )
  }
}

Tile.propTypes = propTypes;

export default DragSource(ItemTypes.TILE, tileSource, collect)(Tile)