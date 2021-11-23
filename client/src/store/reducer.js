import axios from "axios";

import { SET_LEFT, SET_RIGHT, SET_SORT, SET_CREATE, CREATE_POKEMON } from "./actions";

import nav from "../components/nav.module.css";

export function reducer(state={left: nav.off, right: nav.off, sort: nav.off, create: nav.createOff, created: ""}, {type, payload}){
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
            console.log("voy a crear un pokemon")

            console.log(payload)
            
            axios({method: "POST", url: "http://localhost:3001/pokemons", data: payload})
            .then(res => {
                console.log(res);
            }).catch(e => {
                console.log("hubo un error")
            })
            
            return{
                ...state,
                created: "creado"
            }

            

        default:
            return state;

    }

}