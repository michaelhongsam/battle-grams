import React, { Component } from 'react';
import TileSocket from './tileSocket'

export default class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 16 }
  }
  render() {
    let columns = [];
    for (var i = 0; i < this.state.size; i++) {
      let cellID = `${i}`
      columns.push(<td key={cellID} id={cellID}><TileSocket /></td>)
    }
    return (
      <div className="container">
        <table id="letter-bank">
          <tbody>
            {columns}
          </tbody>
        </table>
      </div>
    )
  }
}
