import React, { Component } from 'react';
import TileSlot from './tileSlot'

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 8 }
  }
  render() {
    let columns = [];
    let head = [<th key="spacer" />];
    for (var i = 0; i < this.state.size; i++) {
      let columnID = `col ${i}`
      let cell = [<td key={`row ${i}`}><span>{`row ${i}`}</span></td>]
      head.push(<th key={columnID} id={columnID}>{columnID}</th>)
      for (var idx = 0; idx < this.state.size; idx++) {
        let cellID = `${idx}-${i}`
        cell.push(<td key={cellID} id={cellID}><TileSlot value={``} /></td>)
      }
      columns.push(<tr key={i} id={columnID}>{cell}</tr>)
    }
    return (
      <div className="container">
        <table id="grid">
          <thead>
            <tr>
              {head}
            </tr>
          </thead>
          <tbody>
            {columns}
          </tbody>
        </table>
      </div>
    )
  }
}
