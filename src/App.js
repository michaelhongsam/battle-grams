import React from 'react';
import logo from './logo.svg';
import Grid from './components/grid';
import Bank from './components/bank';
import Footer from './components/footer';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import './App.css';

const App = () => {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BATTLE-GRAMS</h1>
        </header>
        <Grid />
        <Bank />
        <Footer />
      </div>
      </DragDropContextProvider>
    );
  };

export default App;
