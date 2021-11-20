import landing from "./landing.module.css";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div className={landing.landing}>
            <div className={landing.container}>
                <Link to="/pokemons">
                    <img className={landing.pokeball} src="images/pokeball.png" alt="pokeball"/>
                </Link>
                <h1 className={landing.text}>Tap to go to the pokedex</h1>
            </div>
        </div>
    )
}