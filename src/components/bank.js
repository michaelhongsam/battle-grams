import React , { Component } from 'react';
import PropTypes from 'prop-types';

import store, { updateBank } from '../store';
import { connect } from 'react-redux';
import { shuffle } from '../utils/index';

import Tile from './tile';
import GridSquare from './GridSquare';

class Bank extends Component {
  constructor(props) {
    super(props)
    this.renderTileSlot = this.renderTileSlot.bind(this);
  }

  componentDidMount () {
    this.unsubscribeFromRedux = store.subscribe(() => {
        this.setState({ bank: store.getState().bank })
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromRedux()
  }

  renderTileSlot(col, props) {
    const row = 99; // we are using 99 as an indicator of the Bank
    let { bank } = props;
    let tile = bank[col];
  
    if (tile && tile.letter) {
      return (
        <div key={col}>
          <GridSquare row={row} col={col} letter={tile.letter}>
            <Tile row={row} col={col} letter={tile.letter} />
          </GridSquare>
        </div>
    )} else {
      return (
        <div key={col}>
          <GridSquare row={row} col={col} letter={null} />
        </div>
      )}
  }

  render() {
    const slots = [];
    for (let col = 0; col < 10; ++col) {
      slots.push(
        <td key={col} id={col}>
          {this.renderTileSlot(col, this.props)}
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
          onClick={(e) => {
            e.preventDefault()
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

const mapState = ({ bank }) => ({ bank })

const mapDispatch = dispatch => ({
  shuffleBank(bank) {
    let shuffledBank = shuffle(bank)
    dispatch(updateBank(shuffledBank))
  }
})

export default connect(mapState, mapDispatch)(Bank);
