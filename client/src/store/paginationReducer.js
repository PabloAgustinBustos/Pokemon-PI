import { SET_PAGE, SET_TOTAL } from "./actions";

export function paginationReducer(state={page: 1, total:0}, {type, payload}){
    switch(type){
        case SET_PAGE:
            return{
                ...state,
                page: payload
            }
        case SET_TOTAL:
            return{
                ...state,
                total: payload
            }
        
        default:
            return state;

    }
}