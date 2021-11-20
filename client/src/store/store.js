import {createStore} from "redux";
import {menuReducer} from "./menuReducer.js"

const store = createStore(menuReducer);

export default store;