import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import store, {updateBank} from '../store';

// import { updateBank } from '../store';
import { connect } from 'react-redux';

import { shuffle } from '../utils/index';

import Tile from './tile';
import GridSquare from './GridSquare';

function renderTileSlot(col, props) {
  const row = 99; // we are using 99 as an indicator of the Bank
  return (
    <div key={col}>
      <GridSquare row={row} col={col}>
        {renderTile(row, col, props)}
      </GridSquare>
    </div>
  )
}

function renderTile(row, col, props) {
  let { bank } = props;
  let tile = bank[col];
  // return bank[col] ? <Tile letter={bank[col]} row={row} col={col} /> : null;
  // return (letter) ? <Tile letter={letter} row={99} col={col} /> : null;
  if (tile && tile.letter) {
    return (
      <Tile letter={tile.letter} row={99} col={col} />
    )
  }
  else {
    return null
  }
}

class Bank extends Component {
  constructor(props) {
    super(props);
 
  }

  componentDidMount () {
		this.unsubscribeFromRedux = store.subscribe(() => { // VANILLA REDUX
			this.setState({
				bank: store.getState().bank // VANILLA REDUX
			})
		})
	}

	componentWillUnmount () {
		this.unsubscribeFromRedux() // VANILLA REDUX
	}


  render() {
    const slots = [];
    for (let col = 0; col < 10; ++col) {
      slots.push(
        <td key={col} id={col}>
          {renderTileSlot(col, this.props)}
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

export default withRouter(connect(mapState, mapDispatch)(Bank));
