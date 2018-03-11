import { createStore, /*combineReducers,*/ applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension'

// INITIAL STATE
const initialState = {
  grid: [],
  bank: [],
}

// ACTION TYPES
const UPDATE_GRID = 'UPDATE_GRID';
const UPDATE_BANK = 'UPDATE_BANK';

// ACTION CREATORS
export function updateGrid(grid) {
  console.log('updating grid with... ', grid)
  const action = { type: UPDATE_GRID, grid };
  return action;
}
 export function updateBank(bank) {
  console.log('updating bank with... ', bank)
  const action = { type: UPDATE_BANK, bank };
  return action;
}

// THUNK CREATORS


// REDUCER

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GRID:
      return (
        Object.assign(
          {},
          state,
          { grid: action.grid }
        )
      )
    case UPDATE_BANK:
      return (
        Object.assign(
          {},
          state,
          { bank: action.bank }
        )
      )
    default: return state
  }
}

// const middleware = composeWithDevTools(applyMiddleware(
//   thunkMiddleware,
//   createLogger({ collapsed: true })
// ))
// const store = createStore(reducer, middleware)


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggingMiddleware
  )
)
export default store

