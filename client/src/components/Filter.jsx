import { useSelector, useDispatch } from "react-redux";

import {setLeft} from "./../store/actions.js"
import nav from "./nav.module.css";


export default function Filter(){
    const dispatch = useDispatch()
    return(
        <>
            <h2 className={nav.title}>filter</h2>
            <span className={nav.exit} onClick={() => {dispatch(setLeft(nav.off))}}>X</span>
        </>
    )
}