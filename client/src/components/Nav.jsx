import { useSelector, useDispatch } from "react-redux";

import Filter from "./Filter";
import nav from "./nav.module.css";
import SearchBar from "./SearchBar";
import {setLeft, setRight, setSort, setCreate} from "./../store/actions.js"
import Sort from "./Sort";
import CreatePokemon from "./CreatePokemon.jsx";
import { Link } from "react-router-dom";

export default function Nav({type}){  
    let left = useSelector(state => state?.left) || nav.off;
    let right = useSelector(state => state?.right) || nav.off;
    let sort = useSelector(state => state?.sort) || nav.off;
    let create = useSelector(state => state?.create) || nav.createOff;

    const dispatch = useDispatch();

    return(
        <div>
            {type === "default" ? (<>
                <nav className={nav.nav}>
                    <span className={nav.buttons}>
                        <span className={`${nav.icon} material-icons-outlined`} onClick={() => dispatch(setLeft(nav.on))}>filter_alt</span>
                        <span className={`${nav.icon} material-icons-outlined`} onClick={() => dispatch(setSort(nav.on))}>filter_list</span>
                        <span className={`${nav.createIcon} material-icons-outlined`} onClick={() => dispatch(setCreate(nav.createOn))}>add</span>
                        <span className={`${nav.icon} material-icons-outlined`} onClick={() => dispatch(setRight(nav.on))}>search</span>
                    </span>
                </nav>
                
                <div>
                    <div className={nav.container}>
                        <div className={`${nav.filterSpan} ${left}`}>
                            <Filter/>
                        </div>

                        <div className={`${nav.sortSpan} ${sort}`}>
                            <Sort/>
                        </div>
                        
                        <div className={`${nav.searchSpan} ${right}`}>
                            <SearchBar/>
                        </div>
                    </div>

                    <div className={`${nav.createSpan} ${create}`}>
                        <CreatePokemon/>
                    </div>
                </div>    
            </>) : (<>
                <nav className={nav.nav}>
                    <Link to="/pokemons"><span className={`${nav.backIcon}  material-icons`}>arrow_back</span></Link>
                </nav>
            </>)}
            
        </div>
    )
}