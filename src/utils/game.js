import { shuffle, pouch } from './index';

let shuffledPouch = shuffle(pouch);
const bankTiles = [];
for (let i = 0; i < 10; i++) {
  bankTiles.push(shuffledPouch.pop());
}
console.log('bankTiles: ', bankTiles);

let tilePositions = {
  grid: [],
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

  if (target.row === 99) {
    modifiedBank[target.col] = target.letter;
  }
  else
  {
    let gridIdx = modifiedGrid.findIndex( ele => {
      return ele.row === target.row && ele.col === target.col;
    })
    modifiedGrid[gridIdx] = { letter: target.letter, row: target.row, col: target.col };
  }

  if (source.row === 99) {
    modifiedBank[target.col] = null;
  }
  else {
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
