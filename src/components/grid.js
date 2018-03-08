import React, { Component } from 'react';
import Tile from './tile'

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 12 }
  }
  render() {
    let columns = [];
    let head = [<td key="spacer" />];
    for (var i = 0; i < this.state.size; i++) {
      let columnID = `col ${i}`
      let cell = [`row ${i}`]
      head.push(<td key={columnID} id={columnID}>{columnID}</td>)
      for (var idx = 0; idx < this.state.size; idx++) {
        let cellID = `${idx}-${i}`
        cell.push(<td key={cellID} id={cellID}><Tile value = {``} /></td>)
      }
      columns.push(<tr key={i} id={columnID}>{cell}</tr>)
    }
    return (
      <div className="container">
        <table id="grid">
          <thead>
            {head}
          </thead>
          <tbody>
            {columns}
          </tbody>
        </table>
      </div>
    )
  }
}
