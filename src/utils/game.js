import { shuffle, pouch } from './index';

let shuffledPouch = shuffle(pouch);
const bankTiles = [];
for (let i = 0; i < 10; i++) {
  bankTiles.push(shuffledPouch.pop());
}
console.log('bankTiles: ', bankTiles);

let initialGrid = [];
for (let i = 0; i < 64; i++){
    const col = i % 8;
    const row = Math.floor(i / 8)
    initialGrid.push({col: col, row: row, letter: null})
}

let tilePositions = {
  grid: initialGrid,
  bank: bankTiles
};

let observer = null;

function emitChange() {
	observer(tilePositions);
}

export function observe(obj) {
	if (observer) {
		throw new Error('Multiple observers not implemented.');
	}

	observer = obj;
	emitChange();

	return () => {
		observer = null;
	};
}

export function moveTile(source, target) {

  let modifiedBank = tilePositions.bank;
  let modifiedGrid = tilePositions.grid


  // add tile
  if (target.row === 99) { // target going into bank
    modifiedBank[target.col] = target.letter;
  }
  else // target goes into grid
  {
    let gridIdx = modifiedGrid.findIndex( ele => {
      return ele.row === target.row && ele.col === target.col;
    })
    modifiedGrid[gridIdx] = { letter: source.letter, row: target.row, col: target.col };
  }

  // remove tile
  if (source.row === 99) { // remove source from bank
    modifiedBank[source.col] = null;
  }
  else { // remove source from grid
    let gridIdx = modifiedGrid.findIndex( ele => {
      return ele.row === source.row && ele.col === source.col;
    })
    modifiedGrid[gridIdx] = { letter: null, row: source.row, col: source.col };
  }
  
  tilePositions = {
    grid: modifiedGrid,
    bank: modifiedBank,
  }
	emitChange();
}
