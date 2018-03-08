import React /*, { Component } */ from 'react';
import logo from './logo.svg';
import Grid from './components/grid';
import Bank from './components/bank';
// import TileSocket from './components/tileSocket'; this was just a test

import './App.css';

const App = () => {
  // render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BATTLE-GRAMS</h1>
        </header>
        <p className="App-intro">
          {
            //To get started, edit <code>src/App.js</code> and save to reload.
          }
        </p>
        <Grid />
        <Bank />
        {
          // <TileSocket /> this was just a test
        }
      </div>
    );
  }
// }

export default App;
