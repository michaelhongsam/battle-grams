// ACTION TYPES
const UPDATE_GRID = 'UPDATE_GRID';

// INITIAL_STATE
const defaultGrid = {}

// ACTION CREATORS
export const updateGrid = grid => {
  return { type: UPDATE_GRID, grid }
};

// REDUCER
export default function (prevState = defaultGrid, action) {
  switch (action.type) {
    case UPDATE_GRID:
      return action.grid;
    default:
      return prevState;
  }
}
