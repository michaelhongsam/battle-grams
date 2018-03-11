import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateBank } from '../store';
import { connect } from 'react-redux';

import { shuffle } from '../utils/index';

import Tile from './tile';
import GridSquare from './GridSquare';

class Bank extends Component {
  constructor(props) {
    super(props);
    this.renderTile = this.renderTile.bind(this);
    this.renderTileSlot = this.renderTileSlot.bind(this);
  }

  renderTileSlot(col) {
    const row = 99; // we are using 99 as an indicator of the Bank
    return (
      <div key={col}>
        <GridSquare row={row} col={col}>
          {this.renderTile(row, col)}
        </GridSquare>
      </div>
    )
  }

  renderTile(row, col) {
    let { bank } = this.props;
    let tile = bank.find(function (ele) {
      return ele.col === col
    });
    // return bank[col] ? <Tile letter={bank[col]} row={row} col={col} /> : null;
    // return (letter) ? <Tile letter={letter} row={99} col={col} /> : null;
    if (tile) {
      return (
        <Tile letter={tile.letter} row={99} col={col} />
      )
    }
    else {
      return null
    }
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
        <button
          type="button"
          id="reshuffle-button"
          onClick={() => {
            this.props.shuffleBank(this.props.bank)
          }}>
          Reshuffle
        </button>
      </div>
    );
  }
}

Bank.propTypes = {
  bank: PropTypes.array,
}

const mapState = state => ({
  bank: state.bank,
})

const mapDispatch = dispatch => ({
  shuffleBank(bank) {
    let shuffledBank = shuffle(bank)
    dispatch(updateBank(shuffledBank))
  }
})

export default /*withRouter(*/connect(mapState, mapDispatch)(Bank);
