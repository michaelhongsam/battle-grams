

let knightPosition = [1, 7]

// let positions = {
//   grid: {

//   }
//   bank: {
//     0: A
//     1: B
//     2: C
//     3: D 
//   }
// }

let observer = null

function emitChange() {
	// observer(positions)
}

export function observe(o) {
	if (observer) {
		throw new Error('Multiple observers not implemented.')
	}

	observer = o
	emitChange()

	return () => {
		observer = null
	}
}

// export function canMoveKnight(toX, toY) {
// 	const [x, y] = knightPosition
// 	const dx = toX - x
// 	const dy = toY - y

// 	return (
// 		(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
// 		(Math.abs(dx) === 1 && Math.abs(dy) === 2)
// 	)
// }

export function moveTile(source, target) {
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
	emitChange()
}