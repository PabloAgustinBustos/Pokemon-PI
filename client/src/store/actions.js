export const SET_LEFT = "SET_LEFT";
export const SET_RIGHT = "SET_RIGHT";

export function setLeft(payload){
    return{
        type: SET_LEFT,
        payload
    }
}

export function setRight(payload){
    return{
        type: SET_RIGHT,
        payload
    }
}