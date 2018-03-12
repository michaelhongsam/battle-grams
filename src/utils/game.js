import store, { updateGrid, updateBank } from '../store';
// const wordList = require('word-list-json');
const wordObj = require('word-list-json').reduce((words, word) => {words[word] = true; return words}, {})

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
	console.log('row word: ', word, 'isValid: ', wordObj[word.toLowerCase()])
	if ( wordObj[word.toLowerCase()] ) {
		return word;
	}
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
	console.log('col word: ', word, 'isValid: ', wordObj[word.toLowerCase()])
	if ( wordObj[word.toLowerCase()] ) {
		return word;
	}
}

export function moveTile (source, target) {
	console.log('target: ', target);
	console.log('source: ', source);

  let modifiedBank = store.getState().bank;
  let modifiedGrid = store.getState().grid;

	// add tile
	if (target && target.row === 99 && source.row === 99) { // source is from bank, target is in bank
		console.log('bank to bank')

		if (target.letter) {
			modifiedBank[source.col] = target;
		} else {
			modifiedBank[source.col] = null;
		}
		modifiedBank[target.col] = source;
		
		store.dispatch(updateBank(modifiedBank));

	} else if (target && target.row !== 99 && source.row === 99) { // source is from bank, target is in grid
		console.log('bank to grid')
		let gridIdx = modifiedGrid.findIndex( ele => {
      		return ele.row === target.row && ele.col === target.col;
		})
		modifiedGrid[gridIdx].letter = source.letter;

		if (target.letter) {
			modifiedBank[source.col] = target;
		} else {
			modifiedBank[source.col] = null;
		}
		store.dispatch(updateGrid(modifiedGrid));
		store.dispatch(updateBank(modifiedBank));

  	} else if (target && target.row !== 99 && source.row !== 99) {
		console.log('grid to grid')
		let gridIdxTarget = modifiedGrid.findIndex( ele => {
			return ele.row === target.row && ele.col === target.col;
		})
		let gridIdxSource = modifiedGrid.findIndex( ele => {
			return ele.row === source.row && ele.col === source.col;
		})

		modifiedGrid[gridIdxTarget].letter = source.letter;
		modifiedGrid[gridIdxSource].letter = target.letter;
		store.dispatch(updateGrid(modifiedGrid));

	} else {
		console.log('grid to bank')
		let fromGridIdx = modifiedGrid.findIndex( ele => {
			return ele.row === source.row && ele.col === source.col;
		})
		modifiedGrid[fromGridIdx].letter = target.letter;
		modifiedBank[target.col] = source;
		store.dispatch(updateGrid(modifiedGrid));
		store.dispatch(updateBank(modifiedBank));
  }
 
	if ( (target.row !== 99 ) &&	calculateValidRow(target.row)	) {
		alert ( `This word: ${calculateValidRow(target.row)} is a valid word!` );
	}
	if ( calculateValidCol(target.col) ) {
		alert ( `This word: ${calculateValidCol(target.col)} is a valid word!` );
	}

}
