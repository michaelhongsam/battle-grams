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

export function moveTile(row, col) {
  // source = {
  //   letter: "A",
  //   from: "bank"
  //   col: 4;

  // }
  // target = {
  //   letter: "A",
  //   toRow: 1,
  //   toCol: 1,
  // }


  // positions = Object.assign( {}, positions, {

  // }
	emitChange();
}
