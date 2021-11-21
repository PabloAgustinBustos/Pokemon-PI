import { useDispatch } from "react-redux";
import {setSort} from "./../store/actions.js"
import nav from "./nav.module.css";


export default function Sort(){
    const dispatch = useDispatch();
    
    return(
        <>
            <h2 className={nav.title}>Sort</h2>
            <span className={nav.exit} onClick={() => {dispatch(setSort(nav.off))}}>X</span>

            <div className={nav.filter}>
                <label>sort by </label>
                <select>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                    <option value="atk_asc">atk asc</option>
                    <option value="atk_desc">atk desc</option>
                </select>
            </div>
        </>
    )
}