import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  letter: PropTypes.string.isRequired,
};

const style = {
  'borderStyle': 'solid',
  width: '60px',
  height: '60px',
  'borderRadius': '5px',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  display: 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'backgroundColor': '#fff199'
}

const tileSource = {
	beginDrag(props) {
    return {
      letter: props.letter,
		};
	},
  
	endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
		if (dropResult) {
      console.log('tile.js - unmount this tile');
			alert(`You dropped ${item.letter} into ${dropResult.cellId}!`); // eslint-disable-line no-alert
		}
	},
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}


class Tile extends Component {


  constructor(props) {
    super(props);
    this.state = { letter: this.props.value };
  }
  render() {
    const { letter, connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div className="tile" style={{ ...style, opacity }}>
        <span>{letter}</span>
      </div>
    );
  }
}

Tile.propTypes = propTypes;

export default DragSource(ItemTypes.TILE, tileSource, collect)(Tile);
