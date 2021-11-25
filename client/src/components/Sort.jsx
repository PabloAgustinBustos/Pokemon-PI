import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {reset, setSort, sort} from "./../store/actions.js"
import nav from "./nav.module.css";


export default function Sort(){
    const dispatch = useDispatch();

    return(
        <>
            <h2 className={nav.title}>Sort</h2>
            <span className={nav.exit} onClick={() => {dispatch(setSort(nav.off))}}>X</span>

            <div className={nav.filter}>
                <label>sort by </label>
                <select onChange={(e) => {
                    dispatch(sort(e.target.value))
                }}>
                    <option value="DEFAULT">default</option>
                    <option value="ASC">asc</option>
                    <option value="DESC">desc</option>
                    <option value="ATK_ASC">atk asc</option>
                    <option value="ATK_DESC">atk desc</option>
                </select>
            </div>
        </>
    )
}