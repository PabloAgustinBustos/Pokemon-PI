import {createStore, applyMiddleware, compose} from "redux";
import {reducer} from "./reducer.js"
import thunk from "redux-thunk"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
// const store = createStore(reducer);

export default store;