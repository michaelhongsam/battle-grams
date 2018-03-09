export function shuffle(deck) {
  let randomizedDeck = [];
  let array = deck.slice();
  while (array.length !== 0) {
    let rIndex = Math.floor(array.length * Math.random());
    randomizedDeck.push(array[rIndex]);
    array.splice(rIndex, 1);
  }
  return randomizedDeck;
}

export let pouch = [
  'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
  'B', 'B', 'B',
  'C', 'C', 'C',
  'D', 'D', 'D', 'D', 'D', 'D',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'F', 'F', 'F',
  'G', 'G', 'G', 'G',
  'H', 'H', 'H',
  'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
  'J', 'J',
  'K', 'K',
  'L', 'L', 'L', 'L', 'L',
  'M', 'M', 'M',
  'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N',
  'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
  'P', 'P', 'P',
  'Q', 'Q',
  'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R',
  'S', 'S', 'S', 'S', 'S', 'S',
  'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T',
  'U', 'U', 'U', 'U', 'U', 'U',
  'V', 'V', 'V',
  'W', 'W', 'W',
  'X', 'X',
  'Y', 'Y', 'Y',
  'Z', 'Z',
];
