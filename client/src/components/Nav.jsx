import { useState } from "react";
import nav from "./nav.module.css";

export default function Nav(){
    const [left, setLeft] = useState(nav.off);
    const [right, setRight] = useState(nav.off);

    return(
        <div>
            <nav className={nav.nav}>
                <span className={nav.buttons}>
                    <span className={`${nav.icon} material-icons-outlined`} onClick={() => setLeft(nav.on)}>filter_alt</span>
                    <span className={`${nav.icon} material-icons-outlined`} onClick={() => setRight(nav.on)}>search</span>
                </span>
            </nav>
            
            <div className={`${nav.filterSpan} ${left}`}>
                <h2>filter</h2>
                <span className={nav.exit} onClick={() => {setLeft(nav.off)}}>X</span>
            </div>

            <div className={`${nav.searchSpan} ${right}`}>
                <h2>search</h2>
                <span className={nav.exit} onClick={() => {setRight(nav.off)}}>X</span>
            </div>
        </div>
    )
}