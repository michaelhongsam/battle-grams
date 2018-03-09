import React, { Component } from 'react';
// import Tile from './tile';

import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const tileTarget = {
  drop(props) {
    return {
      name: 'tileSlot',
      cellId: props.cellId
     };
  },
};

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

const propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

class TileSlot extends Component {

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className = "tile-slot">
        {this.props.children}
      </div>

    );
  }
}

TileSlot.propTypes = propTypes;

export default DropTarget(ItemTypes.TILE, tileTarget, collect)(TileSlot);
