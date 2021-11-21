import { useSelector, useDispatch } from "react-redux";

import Filter from "./Filter";
import nav from "./nav.module.css";
import SearchBar from "./SearchBar";
import {setLeft, setRight} from "./../store/actions.js"

export default function Nav(){  
    let left = useSelector(state => state?.left) || nav.off;
    let right = useSelector(state => state?.right) || nav.off;
    const dispatch = useDispatch();

    return(
        <div>
            <nav className={nav.nav}>
                <span className={nav.buttons}>
                    <span className={`${nav.icon} material-icons-outlined`} onClick={() => dispatch(setLeft(nav.on))}>filter_alt</span>
                    <span className={`${nav.icon} material-icons`}>filter_list</span>
                    <span className={`${nav.icon} material-icons-outlined`}>add</span>
                    <span className={`${nav.icon} material-icons-outlined`} onClick={() => dispatch(setRight(nav.on))}>search</span>
                </span>
            </nav>
            
            
            <div className={`${nav.filterSpan} ${left}`}>
                <Filter/>
            </div>

            <div className={`${nav.searchSpan} ${right}`}>
                <SearchBar/>
            </div>
        </div>
    )
}