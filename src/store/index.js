import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import bank from './bank'
import grid from './grid'
import tile from './tile'
import tileSlot from './tileSlot'


const reducer = combineReducers({ bank, grid, tile, tileSlot })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './bank'
export * from './grid'
export * from './tile'
export * from './tileSlot'
