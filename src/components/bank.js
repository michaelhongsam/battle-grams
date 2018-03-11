import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from './tile';
import TileSlot from './tileSlot';
import GridSquare from './GridSquare';
import { shuffle, pouch } from '../utils/index';
import { bankTiles } from '../utils/game';

export default class Bank extends Component {
  constructor() {
    super();
    // this.shuffleChildren = this.shuffleChildren.bind(this);
  }


  // shuffleChildren(){
  //   this.setState({ columns: shuffle(this.state.columns) });
  // }

  // componentDidMount(){
  //   this.setState({ columns:  });
  // }
  // < button type = "button" id = "reshuffle-button" onClick = { this.shuffleChildren } > Reshuffle</button>

  renderTileSlot(i) {
    const col = i % 10;
    const row = 9;

    return (
      <div key={i}>
        <GridSquare row={row} col={col}>
          {this.renderTile(i)}
        </GridSquare>
      </div>
    )
  }

  renderTile(i) {
    let bank = this.props.tilePositions.bank;
    return bank[i] ? <Tile letter={bank[i]} /> : null;
  }

  render() {
    const slots = [];
    for (let i = 0; i < 10; ++i) {
      slots.push(this.renderTileSlot(i))
    }

    return (
      <div className="container">
        <table id="letter-bank">
          <tbody>
            <tr>
              {slots}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


Bank.propTypes = {
  tilePositions: PropTypes.object,
}
