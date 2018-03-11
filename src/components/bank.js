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

  renderTileSlot(col) {
    const row = 99;

    return (
      <div key={col}>
        <GridSquare row={row} col={col}>
          {this.renderTile(row, col)}
        </GridSquare>
      </div>
    )
  }

  renderTile(row, col) {
    let bank = this.props.tilePositions.bank;
    return bank[col] ? <Tile letter={bank[col]} row={row} col={col} /> : null;
  }

  render() {
    const slots = [];
    for (let col = 0; col < 10; ++col) {
      slots.push(
        <td key={col} id={col}>
          {this.renderTileSlot(col)}
        </td>
      )
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
