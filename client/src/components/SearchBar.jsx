import { useState } from "react";
import { useDispatch } from "react-redux";

import {setRight} from "./../store/actions.js"
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
            {/* TODO: programar que haga dispatch para buscar el pokemon */}
            <button className={searchBar.button} onClick={() => {console.log("se buscará a " + pokeName)}}>search</button>
        </>
    )
}