import axios from "axios";

export const SET_LEFT = "SET_LEFT";
export const SET_RIGHT = "SET_RIGHT";
export const SET_SORT = "SET_SORT";
export const SET_PAGE = "SET_PAGE";
export const SET_TOTAL = "SET_TOTAL";
export const SET_CREATE = "SET_CREATE";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEFRAGMENT = "GET_POKEFRAGMENT";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_INFO = "GET_POKEMON_INFO";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const RESET = "RESET";
export const SORT = "SORT";

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

export function setSort(payload){
    return{
        type: SET_SORT,
        payload
    }
}

export function setPage(payload){
    return{
        type: SET_PAGE,
        payload
    }
}

export function setTotal(payload){
    return{
        type: SET_TOTAL,
        payload
    }
}

export function setCreate(payload){
    return{
        type: SET_CREATE,
        payload
    }
}

export function createPokemon(payload){
    return async (dispatch) => {
        const res = axios({method: "POST", url: `https://expressjs-postgres-production-815e.up.railway.app/pokemons`, data: payload});
        
        return dispatch({
            type: CREATE_POKEMON,
            payload: res.data
        })
    }
}

export function getPokemons(payload){
    return async (dispatch) => {
        const pokemons = await axios(`https://expressjs-postgres-production-815e.up.railway.app/pokemons`);
        
        const payload = pokemons.data;

        return dispatch({
            type: GET_POKEMONS,
            payload
        })
    }
}

export function getPokeFragment(payload){
    return{
        type: GET_POKEFRAGMENT,
        payload
    }
}

export function getPokemon(payload){
    return async (dispatch) => {
        let pokemon;
        
        try{
            pokemon = await axios("https://expressjs-postgres-production-815e.up.railway.app/pokemons?name=" + payload);
    
        }catch(e){

        }

        return dispatch({
            type: GET_POKEMON,
            payload: pokemon?.data || [{name: "error no existe el pokemon"}]
        })
    }
}

export function getPokemonInfo(payload){
    return{
        type: GET_POKEMON_INFO,
        payload
    }
}

export function filterByType(payload){
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}

export function filterByOrigin(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function reset(payload){
    return{
        type: RESET,
        payload
    }
}

export function sort(payload){
    return{
        type: SORT,
        payload
    }
}