import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TileSlot extends Component {
  static propTypes = {
    children: PropTypes.node,
  };
  
  render() {
    return (
      <div className = "tile-slot">
        {this.props.children}
      </div>
    )
  }
}

export default TileSlot;
