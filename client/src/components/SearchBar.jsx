import { useState } from "react";
import { useDispatch } from "react-redux";

import {setRight, getPokemon, reset} from "./../store/actions.js"
import nav from "./nav.module.css";
import searchBar from "./searchBar.module.css"

export default function SearchBar(){
    const [pokeName, setPokeName] = useState("");
    const dispatch = useDispatch();

    return(
        <>
            <h2 className={nav.title}>search</h2>
            <span className={nav.exit} onClick={() => {dispatch(setRight(nav.off))}}>X</span>

            <input type="text" placeholder="search by name" onChange={(e) => {setPokeName(e.target.value)}}/>
            <br/><br/>
            <button className={searchBar.button} onClick={() => {
                dispatch(reset());
                dispatch(getPokemon(pokeName));
                dispatch(setRight(nav.off))
            }}>search</button>
        </>
    )
}