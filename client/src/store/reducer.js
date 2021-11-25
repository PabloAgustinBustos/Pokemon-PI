import { SET_LEFT, SET_RIGHT, SET_SORT, SET_CREATE, CREATE_POKEMON, GET_POKEMONS, GET_POKEMON, FILTER_BY_TYPE, RESET, FILTER_BY_ORIGIN, SORT, GET_POKEMON_INFO } from "./actions";

import nav from "../components/nav.module.css";

export function reducer(state={left: nav.off, right: nav.off, sort: nav.off, create: nav.createOff, created: "", default: [], pokemons: [], backup: [], pokemon: {}}, {type, payload}){
    let pokemons;
    let pokemonFiltered;
    let pokemonsOrdered;
    let pokemon;
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
            
        case GET_POKEMON_INFO:
            pokemon = state.pokemons.find(p => p.name === payload.pokeName);

            console.log(state.pokemons)
            console.log(pokemon)

            return{
                ...state,
                pokemon
            }

        case FILTER_BY_TYPE:
            pokemons = state.pokemons;

            pokemonFiltered = [];
            
            if(payload === "default"){
                pokemonFiltered = [...pokemons]
            }else{
                pokemonFiltered = pokemons.filter(p => {
                    let tipos=p.types ? p.types : p.Types;  
                    
                    return tipos.filter(type => type.name === payload).length > 0
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