import { useSelector, useDispatch } from "react-redux";

import {setRight} from "./../store/actions.js"
import nav from "./nav.module.css";

export default function SearchBar(){
    const dispatch = useDispatch()
    return(
        <>
            <h2>search</h2>
            <span className={nav.exit} onClick={() => {dispatch(setRight(nav.off))}}>X</span>
        </>
    )
}