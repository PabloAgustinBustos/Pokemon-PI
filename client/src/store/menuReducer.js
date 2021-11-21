import { SET_LEFT, SET_RIGHT, SET_SORT } from "./actions";

import nav from "../components/nav.module.css";

export function menuReducer(state={left: nav.off, right: nav.off, sort: nav.off}, {type, payload}){
    switch(type){
        case SET_LEFT:
            return{
                ...state,
                left: payload
            }
        
        case SET_RIGHT:
            return{
                ...state,
                right: payload
            }

        case SET_SORT:
            return{
                ...state,
                sort: payload
            }

        default:
            return state;

    }

}