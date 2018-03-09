import React, { Component } from 'react';
import Tile from './tile';
import TileSlot from './tileSlot';
import { shuffle, pouch } from '../utils';

export default class Bank extends Component {
  constructor() {
    super();
    this.state = {
      size: 10,
      columns: []
    };
    this.shuffledPouch = shuffle(pouch);
    this.currentTiles = [];
    for (let i = 0; i < this.state.size; i++) {
      let cellID = `${i}`;
      this.currentTiles.push(
        <td key={cellID} id={cellID}>
          <TileSlot>
            <Tile key={cellID} letter={this.shuffledPouch.pop()} />
          </TileSlot>
        </td>);
    }
    this.shuffleChildren = this.shuffleChildren.bind(this);
  }

  shuffleChildren(){
    this.setState({ columns: shuffle(this.state.columns) });
  }

  componentDidMount(){
    this.setState({ columns: this.currentTiles });
  }

  render() {

    return (
      <div className="container">
        <table id="letter-bank">
          <tbody>
            <tr>
              {this.state.columns}
            </tr>
          </tbody>
        </table>
        <button type="button" id="reshuffle-button" onClick={this.shuffleChildren}>Reshuffle</button>
      </div>
    );
  }
}
