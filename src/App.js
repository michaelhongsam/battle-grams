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
  // constructor(props) {
  //   super(props);
  //   // this.unobserve = observe(this.handleChange.bind(this));
  // }

  componentDidMount() {
    let initialGrid = [];
    for (let i = 0; i < 64; i++){
        const col = i % 8;
        const row = Math.floor(i / 8)
        initialGrid.push({row: row, col: col, letter: null, status: 'na'})
    }
    store.dispatch(updateGrid(initialGrid))

    let shuffledPouch = shuffle(pouch);
    const initialBank = [];
    for (let i = 0; i < 10; i++) {
      initialBank.push({
        letter: shuffledPouch.pop(),
        col: i,
        row: 99,
        status: 'na',
      })
    }
    store.dispatch(updateBank(initialBank))
  }

  // handleChange(tilePositions) {
  //   console.log('handleChange', tilePositions)
  //   const nextState = { tilePositions };
  //   if (this.state) {
  //     this.setState(nextState);
  //   } else {
  //     this.state = nextState;
  //   }
  // // }

  // componentWillMount() {
  //   this.unobserve();
  // }

  render () {
    // const { tilePositions } = this.state;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          {
            // <img src={logo} className="App-logo" alt="logo" />
          }
          <h1 className="App-title">Welcome to BATTLE-GRAMS</h1>
        </header>
        {
          // <Grid grid={this.props.grid} />
          // <Bank bank={this.props.bank} />
        }
        <Grid />
        <Bank />
        <Footer />
      </div>
      </DragDropContextProvider>
    );
  }
}

// const mapState = state => ({
//   grid: state.grid,
//   bank: state.bank,
// })

// const mapDispatch = null;

// export default connect(mapState, mapDispatch)(App);
export default App;

