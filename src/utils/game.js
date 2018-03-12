import store, { updateGrid, updateBank } from '../store';
import { connect } from 'react-redux';

import axios from 'axios';
// http://www.anagramica.com/lookup/{a word goes here}

function calculateValidRow(row){
  let modifiedGrid = store.getState().grid;
  let word = '';
  for (let i = 0; i < 8; i++){
    if (modifiedGrid[ 8 * row + i ].letter === null){
      word += '';
    }
    else {
      word += modifiedGrid[ 8 * row + i ].letter;
    }
  }
  console.log('row word is: ', word)

  axios.get(`http://www.anagramica.com/lookup/${word}`)
  .then(res => res.data)
  .then(data => console.log('row res ', data))
}
function calculateValidCol(col){
  let modifiedGrid = store.getState().grid;
  let word = '';
  for (let i = 0; i < 8; i++){
    if (modifiedGrid[ 8 * i + col ].letter === null){
      word += '';
    }
    else {
      word += modifiedGrid[ 8 * i + col ].letter;
    }
  }
  console.log('col word is: ', word)
  axios.get(`http://www.anagramica.com/lookup/${word}`)
  .then(res => res.data)
  .then(data => console.log('col res ', data))
}

export function moveTile (source, target) {

  let modifiedBank = store.getState().bank;
  let modifiedGrid = store.getState().grid;

  // add tile
  if (target.row === 99) { // target going into bank
    modifiedBank[target.col] = target.letter;
  }
  else // target goes into grid
  {
    let gridIdx = modifiedGrid.findIndex( ele => {
      return ele.row === target.row && ele.col === target.col;
    })
    modifiedGrid[gridIdx] = { row: target.row, col: target.col, letter: source.letter };
  }

  // remove tile
  if (source.row === 99) { // remove source from bank
    modifiedBank[source.col] = target.letter;
  }
  else { // remove source from grid
    let gridIdx = modifiedGrid.findIndex( ele => {
      return ele.row === source.row && ele.col === source.col;
    })
    modifiedGrid[gridIdx] = { row: source.row, col: source.col, letter: target.letter };
	}
	console.log('modifiedGrid: ', modifiedGrid)
  console.log('modifiedBank: ', modifiedBank)

  console.log(' install a CORS override extension: https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim')
  calculateValidRow(target.row);
  calculateValidCol(target.col);

	store.dispatch(updateGrid(modifiedGrid));
	store.dispatch(updateBank(modifiedBank));
}
