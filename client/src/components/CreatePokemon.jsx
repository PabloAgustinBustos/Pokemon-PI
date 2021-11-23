import React, { useState, useEffect } from 'react'
import axios from "axios";

import create from "./createPokemon.module.css";
import nav from "./nav.module.css";
import btn from "./searchBar.module.css";

import { setCreate, createPokemon} from '../store/actions';
import {getPokemons} from "../store/actions";
import { useDispatch } from 'react-redux';

export default function CreatePokemon(){
    const [types, setTypes] = useState([]);
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name : "",
        hp : 100,
        atk : 100,
        def : 100,
        speed : 100,
        height : 100,
        weight : 100,
        types : []
    });
    
    useEffect(() => {
        (async() => {
          const types = await axios("https://pokeapi.co/api/v2/type");
          setTypes(types.data.results);
        })()    
    }, []);

    return(
        <form onSubmit={e => {
            e.preventDefault();
            dispatch(createPokemon(values))
            dispatch(setCreate(nav.createOff))
            dispatch(getPokemons())
        }} className={create.form}>
            <h2 className={nav.addTitle}>create pokemon</h2>
            <span className={nav.createExit} onClick={() => {dispatch(setCreate(nav.createOff))}}>X</span>

            <div className={create.inputs}>

                <div className={create.inputText}>
                    <input id="name" onChange={e => {
                        setValues(prev => {
                            return{
                                ...prev,
                                [e.target.id]: e.target.value
                            }
                        })
                    }} type="text" placeholder="name"/>

                    
                    
                    <input id="hp" onChange={e => {
                        setValues(prev => {
                            let value = parseInt(e.target.value)
                            return{
                                ...prev,
                                [e.target.id]: value
                            }
                        })
                    }} type="number" placeholder="hp"/>

                    <input id="atk" onChange={e => {
                        setValues(prev => {
                            let value = parseInt(e.target.value)
                            return{
                                ...prev,
                                [e.target.id]: value
                            }
                        })
                    }} type="number" placeholder="atk"/>
                    
                    <input id="def" onChange={e => {
                        setValues(prev => {
                            let value = parseInt(e.target.value)
                            return{
                                ...prev,
                                [e.target.id]: value
                            }
                        })
                    }} type="number" placeholder="def"/>

                    <input id="speed" onChange={e => {
                        setValues(prev => {
                            let value = parseInt(e.target.value)
                            return{
                                ...prev,
                                [e.target.id]: value
                            }
                        })
                    }} type="number" placeholder="weight"/>

                    <input id="height" onChange={e => {
                        setValues(prev => {
                            let value = parseInt(e.target.value)
                            return{
                                ...prev,
                                [e.target.id]: value
                            }
                        })
                    }} type="number" placeholder="speed"/>

                    <input id="weight" onChange={e => {
                        setValues(prev => {
                            let value = parseInt(e.target.value)
                            return{
                                ...prev,
                                [e.target.id]: value
                            }
                        })
                    }} type="number" placeholder="height"/>
                </div>
                <div className={create.container}>
                    {types.map((t, id) => <span key={id}><input onChange={e => setValues(prev => {
                        let types= e.target.classList[0];
                        let value = id+1;

                        if(e.target.checked){
                            return{
                                ...prev,
                                [types]: [...prev[types] , value]
                            }
                        }else{
                            const newTypes = [];

                            prev.types.forEach(t => {
                                console.log(t + " === " + value + "?");
                                if(t !== value){
                                    newTypes.push(t)
                                }
                            })

                            return{
                                [types]: [...newTypes]
                            }
                        }
                    })} className="types" type="checkbox" value={id+1}/><label>{t.name}</label></span>)}
                </div>
            </div>
        

            <input className={btn.button} type="submit" value="create"/>
        </form>
    )
}