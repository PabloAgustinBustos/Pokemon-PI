import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {setLeft, filterByType, reset, filterByOrigin, getPokemons} from "./../store/actions.js"
import nav from "./nav.module.css";

import axios from "axios";

export default function Filter(){
    const dispatch = useDispatch();
    const [types, setTypes] = useState([]);
    
    useEffect(() => {
        (async() => {
          const types = await axios("https://pokeapi.co/api/v2/type");
          setTypes(types.data.results);
        })()    
    }, []);

    return(
        <>
            <h2 className={nav.title}>filter</h2>
            <span className={nav.exit} onClick={() => {dispatch(setLeft(nav.off))}}>X</span>

            <div className={nav.filter}>
                <span>
                    <label>type </label>
                    <select onChange={e => {
                        dispatch(reset())
                        dispatch(filterByType(e.target.value))
                    }}>
                        <option value="default">default</option>
                        {types.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </select>
                </span>

                <span>
                    <label>origin </label>
                    <select onChange={e => {
                        dispatch(reset())
                        if(e.target.value === "all"){
                            dispatch(getPokemons());
                        }else{
                            dispatch(filterByOrigin(e.target.value))
                        }
                    }}>
                        <option value="all">all</option>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                    </select>
                </span>
            </div>
        </>
    )
}