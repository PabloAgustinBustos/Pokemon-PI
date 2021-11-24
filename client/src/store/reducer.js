import { SET_LEFT, SET_RIGHT, SET_SORT, SET_CREATE, CREATE_POKEMON, GET_POKEMONS, GET_POKEFRAGMENT, GET_POKEMON, FILTER_BY_TYPE, RESET, FILTER_BY_ORIGIN } from "./actions";

import nav from "../components/nav.module.css";

export function reducer(state={left: nav.off, right: nav.off, sort: nav.off, create: nav.createOff, created: "", pokemons: [], backup: [], pokeFragment:[], pokemon: {}}, {type, payload}){
    let pokemons = undefined;
    let pokemonFiltered = undefined;
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

        case GET_POKEMON:
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
            
        case FILTER_BY_TYPE:
            pokemons = state.pokemons;

            pokemonFiltered = [];

            if(payload === "default"){
                pokemonFiltered = pokemons
            }else{
                pokemonFiltered = pokemons.filter(p => {
                    let tipos=p.types?p.types:p.Types;
                    return tipos.filter(type => {
                        console.log(type);
                        console.log(type.name === payload)
                        return type.name === payload
                    }).length > 0
                })
            }

            return{
                ...state,
                backup: pokemons,
                pokemons: pokemonFiltered
            }

        case FILTER_BY_ORIGIN:
            pokemons = state.pokemons;

            pokemonFiltered = [];

            console.log("se buscará por ", payload)

            switch(payload){
                case "API":
                    pokemonFiltered = pokemons.filter(p => {
                        console.log(p.id, "=>", typeof p.id == "number");


                        return typeof p.id == "number";
                        
                    })
                    break;
                
                case "DB":
                    pokemonFiltered = pokemons.filter(p => {
                        console.log(p.id, "=>", typeof p.id == "string");
                        return typeof p.id == "string";
                    })
                    break;

                case "all":
                    pokemonFiltered = state.backup;
                    break;
            }

            return{
                ...state,
                backup: pokemons,
                pokemons: pokemonFiltered
            }
            
        case RESET:
            if(state.backup.length > 0){
                return{
                    pokemons: state.backup,
                    backup:[] 
                }
            }

        default:
            return state;

    }

}