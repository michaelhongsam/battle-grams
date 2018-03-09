import React, { Component } from 'react';
import Tile from './tile';
import TileSlot from './tileSlot';

export default class Bank extends Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      size: 10,
      //   pouch: [
      //     'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
      //     'B', 'B', 'B',
      //     'C', 'C', 'C',
      //     'D', 'D', 'D', 'D', 'D', 'D',
      //     'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
      //     'F', 'F', 'F',
      //     'G', 'G', 'G', 'G',
      //     'H', 'H', 'H',
      //     'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
      //     'J', 'J',
      //     'K', 'K',
      //     'L', 'L', 'L', 'L', 'L',
      //     'M', 'M', 'M',
      //     'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
      //     'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
      //     'P', 'P', 'P',
      //     'Q', 'Q',
      //     'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R',
      //     'S', 'S', 'S', 'S', 'S', 'S',
      //     'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T',
      //     'U', 'U', 'U', 'U', 'U', 'U',
      //     'V', 'V', 'V',
      //     'W', 'W', 'W',
      //     'X', 'X',
      //     'Y', 'Y', 'Y',
      //     'Z', 'Z',
      //   ]
    };
  }
  shuffle(deck) {
    let randomizedDeck = [];
    let array = deck.slice();
    while (array.length !== 0) {
      let rIndex = Math.floor(array.length * Math.random());
      randomizedDeck.push(array[rIndex]);
      array.splice(rIndex, 1);
    }
    return randomizedDeck;
  }


  render() {
    // console.log('pouch has this many tiles: ', this.state.length)

    let shuffledPouch = this.shuffle([
      'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
      'B', 'B', 'B',
      'C', 'C', 'C',
      'D', 'D', 'D', 'D', 'D', 'D',
      'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
      'F', 'F', 'F',
      'G', 'G', 'G', 'G',
      'H', 'H', 'H',
      'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
      'J', 'J',
      'K', 'K',
      'L', 'L', 'L', 'L', 'L',
      'M', 'M', 'M',
      'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
      'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
      'P', 'P', 'P',
      'Q', 'Q',
      'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R',
      'S', 'S', 'S', 'S', 'S', 'S',
      'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T',
      'U', 'U', 'U', 'U', 'U', 'U',
      'V', 'V', 'V',
      'W', 'W', 'W',
      'X', 'X',
      'Y', 'Y', 'Y',
      'Z', 'Z',
    ]);

    let columns = [];
    for (let i = 0; i < this.state.size; i++) {
      let cellID = `${i}`;
      console.log('shuffledPouch: ', shuffledPouch[0]);
      columns.push(<td key={cellID} id={cellID}>
        <TileSlot>
          <Tile letter={shuffledPouch.pop()} />
        </TileSlot></td>);
    }
    return (
      <div className="container">
        <table id="letter-bank">
          <tbody>
            <tr>
              {columns}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
