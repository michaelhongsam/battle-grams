import React, { Component } from 'react';
import Tile from './tile';

import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const tileTarget = {
  drop() {
    return { name: 'tileSlot' }
  },
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

const propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
}

class TileSlot extends Component {

  render() {
    const { canDrop, isOver, connectDropTarget, letter } = this.props
    // const isActive = canDrop && isOver

    return connectDropTarget(
      <div className = "tile-slot">
      {
        // if (tile exists in the state at a cell id) return <Tile value = that letter />
        this.props.children
      }
      </div>
    )
  }
}

TileSlot.propTypes = propTypes;

export default DropTarget(ItemTypes.TILE, tileTarget, collect)(TileSlot)
