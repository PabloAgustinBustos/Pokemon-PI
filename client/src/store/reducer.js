import axios from "axios";

import { SET_LEFT, SET_RIGHT, SET_SORT, SET_CREATE, CREATE_POKEMON, GET_POKEMONS, GET_POKEFRAGMENT } from "./actions";

import nav from "../components/nav.module.css";

export function reducer(state={left: nav.off, right: nav.off, sort: nav.off, create: nav.createOff, created: "", pokemons: [], pokeFragment:[]}, {type, payload}){
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

        case SET_CREATE:
            console.log("se abre/cierra la ventana")
            return{
                ...state,
                create: payload
            }

        case CREATE_POKEMON:               
            return{
                ...state,
                created: "creado"
            }

        case GET_POKEMONS:
            return{
                ...state,
                pokemons: payload
            }
            
        case GET_POKEFRAGMENT:
            console.log("se cambiará el contenido")
            return{
                ...state,
                pokeFragment: payload
            }           

        default:
            return state;

    }

}