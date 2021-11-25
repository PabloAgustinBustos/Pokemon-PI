import { SET_LEFT, SET_RIGHT, SET_SORT, SET_CREATE, CREATE_POKEMON, GET_POKEMONS, GET_POKEMON, FILTER_BY_TYPE, RESET, FILTER_BY_ORIGIN, SORT } from "./actions";

import nav from "../components/nav.module.css";

export function reducer(state={left: nav.off, right: nav.off, sort: nav.off, create: nav.createOff, created: "", default: [], pokemons: [], backup: [], pokemon: {}}, {type, payload}){
    let pokemons;
    let pokemonFiltered;
    let pokemonsOrdered;
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
                default: payload,
                pokemons: payload,
                backup: payload
            }

        case GET_POKEMON:
            return{
                ...state,
                pokemons: payload
            }       
            
        case FILTER_BY_TYPE:
            //agarro los pokemons
            pokemons = state.pokemons;

            pokemonFiltered = [];
            
            if(payload === "default"){
                //si es default, los pokemons filtrados seran los actuales
                pokemonFiltered = [...pokemons]
            }else{
                pokemonFiltered = pokemons.filter(p => {
                    let tipos=p.types ? p.types : p.Types;  //extraigo el array de tipos
                    
                    console.log(p)

                    //retorno el array filtrado
                    return tipos.filter(type => type.name === payload).length > 0
                })
            }

            console.log(pokemonFiltered)

            return{
                ...state,
                backup: pokemons, //n el backup tengo guardados todos los pokemons
                pokemons: pokemonFiltered   //y los pokmons que renderizará sera solo los filtrados
            }

        case FILTER_BY_ORIGIN:
            pokemons = state.pokemons;

            pokemonFiltered = [];

            switch(payload){
                case "API":
                    pokemonFiltered = pokemons.filter(p => typeof p.id == "number")
                    break;
                
                case "DB":
                    pokemonFiltered = pokemons.filter(p => typeof p.id == "string")
                    break;

                case "all":
                    pokemonFiltered = state.backup;
                    break;

                default:
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
            break;

        case SORT:
            pokemons = state.pokemons;
            pokemonsOrdered = [];

            switch(payload){
                case "DEFAULT":
                    pokemonsOrdered = state.default;
                    break;

                case "ASC":
                    pokemonsOrdered = [...pokemons];

                    for (let i = 0; i < pokemonsOrdered.length; i++) {
                        for (let j = 0; j < (pokemonsOrdered.length - i - 1); j++) { 
                            if(pokemonsOrdered[j].name.toLowerCase() > pokemonsOrdered[j+1].name.toLowerCase()) {
                                let tmp = pokemonsOrdered[j]; 
                                pokemonsOrdered[j] = pokemonsOrdered[j+1]; 
                                pokemonsOrdered[j+1] = tmp; 
                            }
                        }   
                    }
                    break;

                case "DESC":
                    pokemonsOrdered = [...pokemons];

                    for (let i = 0; i < pokemonsOrdered.length; i++) {
                        for (let j = 0; j < (pokemonsOrdered.length - i - 1); j++) { 
                            if(pokemonsOrdered[j].name.toLowerCase() < pokemonsOrdered[j+1].name.toLowerCase()) {
                                let tmp = pokemonsOrdered[j]; 
                                pokemonsOrdered[j] = pokemonsOrdered[j+1]; 
                                pokemonsOrdered[j+1] = tmp; 
                            }
                        }   
                    }
                    break;

                case "ATK_ASC":
                    pokemonsOrdered = [...pokemons];

                    for (let i = 0; i < pokemonsOrdered.length; i++) {
                        for (let j = 0; j < (pokemonsOrdered.length - i - 1); j++) { 
                            if(pokemonsOrdered[j].atk > pokemonsOrdered[j+1].atk) {
                                let tmp = pokemonsOrdered[j]; 
                                pokemonsOrdered[j] = pokemonsOrdered[j+1]; 
                                pokemonsOrdered[j+1] = tmp; 
                            }
                        }   
                    }

                    break;

                case "ATK_DESC":
                    pokemonsOrdered = [...pokemons];

                    for (let i = 0; i < pokemonsOrdered.length; i++) {
                        for (let j = 0; j < (pokemonsOrdered.length - i - 1); j++) { 
                            if(pokemonsOrdered[j].atk < pokemonsOrdered[j+1].atk) {
                                let tmp = pokemonsOrdered[j]; 
                                pokemonsOrdered[j] = pokemonsOrdered[j+1]; 
                                pokemonsOrdered[j+1] = tmp; 
                            }
                        }   
                    }
                    break;

                default:
                    break;
            }

            return{
                ...state,
                backup: pokemons,
                pokemons: pokemonsOrdered
            }

        default:
            return state;

    }

}