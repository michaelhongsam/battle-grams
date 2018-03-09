import { shuffle } from '../utils';

// ACTION TYPES
const UPDATE_BANK = 'UPDATE_BANK';

// INITIAL_STATE
const pouch = [
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
]

const defaultBank = shuffle(pouch);

// ACTION CREATORS
export const updateBank = bank => {
  return { type: UPDATE_BANK, bank }
};

// REDUCER
export default function (prevState = defaultBank, action) {
  switch (action.type) {
    case UPDATE_BANK:
      return action.bank;
    default:
      return prevState;
  }
}