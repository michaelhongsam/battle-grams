import React from 'react';
import logo from './logo.svg';
import Grid from './components/grid';
import Bank from './components/bank';
import Footer from './components/footer';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { observe } from './utils/game';
import Tile from './components/tile';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.unobserve = observe(this.handleChange.bind(this));
  }

  handleChange(tilePositions) {
    const nextState = { tilePositions };
    if (this.state) {
      this.setState(nextState);
    } else {
      this.state = nextState;
    }
  }

  componentWillMount() {
    this.unobserve();
  }

  render () {
    const { tilePositions } = this.state;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BATTLE-GRAMS</h1>
        </header>
        <Grid tilePositions={tilePositions} />
        <Bank tilePositions={tilePositions} />
        <Footer />
      </div>
      </DragDropContextProvider>
    );
  }
}

export default App;
