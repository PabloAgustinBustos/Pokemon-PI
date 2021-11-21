import {createStore, combineReducers} from "redux";
import {menuReducer} from "./menuReducer.js"
import {paginationReducer} from "./paginationReducer.js"

const store = createStore(combineReducers({menuReducer, paginationReducer}));


export default store;