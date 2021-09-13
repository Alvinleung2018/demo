import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'

export type rootState = ReturnType<typeof reducers>
const store = createStore(reducers, composeWithDevTools(applyMiddleware()))

export default store