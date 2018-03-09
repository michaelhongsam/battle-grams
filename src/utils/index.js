export function shuffle(deck) {
  let randomizedDeck = [];
  let array = deck.slice();
  while (array.length !== 0) {
    let rIndex = Math.floor(array.length * Math.random());
    randomizedDeck.push(array[rIndex]);
    array.splice(rIndex, 1)
  }
  return randomizedDeck;