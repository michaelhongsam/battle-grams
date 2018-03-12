import React from 'react';
import logo from './logo.svg';
import Grid from './components/grid';
import Bank from './components/bank';
import Footer from './components/footer';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { connect } from 'react-redux';

import store, { updateGrid, updateBank } from './store';

import { shuffle, pouch } from './utils';

import './App.css';

class App extends React.Component {

  componentDidMount() {
    let initialGrid = [];
    for (let i = 0; i < 64; i++){
        const col = i % 8;
        const row = Math.floor(i / 8)
        initialGrid.push({col: col, row: row, letter: null })
    }
    store.dispatch(updateGrid(initialGrid))

    let shuffledPouch = shuffle(pouch);
    const initialBank = [];
    for (let i = 0; i < 10; i++) {
      initialBank.push({
        col: i,
        row: 99,
        letter: shuffledPouch.pop()
      })
    }
    store.dispatch(updateBank(initialBank))
  }

  render () {

    return (
      <DragDropContextProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          {
          //<img src={logo} className="App-logo" alt="logo" />
          }
          <h1 className="App-title">Welcome to BATTLE-GRAMS</h1>
        </header>
        <Grid />
        <Bank />
        <Footer />
      </div>
      </DragDropContextProvider>
    );
  }
}

export default App;

