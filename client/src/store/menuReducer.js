import { SET_LEFT, SET_RIGHT } from "./actions";

import nav from "../components/nav.module.css";

export function menuReducer(state={left: nav.off, right: nav.off}, {type, payload}){
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
    }
}