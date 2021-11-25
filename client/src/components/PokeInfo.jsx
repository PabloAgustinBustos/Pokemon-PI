import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import info from "./pokeInfo.module.css";
import { getPokemonInfo } from "../store/actions";

export default function PokeInfo(){
    const params = useParams();

    const pokemon = useSelector(state => state.pokemon);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonInfo(params));
    }, [])
    
    return(
        <div className={info.container}>
            <div className={info.back}>

                <div className={info.top}>
                    <div className={info.containerImg}>
                        <img className={info.img} src={pokemon.sprite}/>
                    </div>

                    <div className={info.right}>
                        <h1 className={info.name}>{pokemon.name}</h1>
                        <span className={info.types}>{pokemon.types?.map(t => t.name + ", ") || pokemon.Types?.map(t => t.name+ ", ")}</span>
                    </div>
                </div>

                <div className={info.stats}>
                    <div className={info.items}>
                        <span className={info.item}>hp: </span><br/>
                        <span className={info.item}>atk: </span><br/>
                        <span className={info.item}>def: </span><br/>
                        <span className={info.item}>speed: </span><br/>
                        <span className={info.item}>height: </span><br/>
                        <span className={info.item}>weight: </span><br/>
                    </div>
                    
                    <div className={info.values}>                    
                        <span className={info.value}>{pokemon.hp}</span><br/>
                        <span className={info.value}>{pokemon.atk}</span><br/>
                        <span className={info.value}>{pokemon.def}</span><br/>
                        <span className={info.value}>{pokemon.speed}</span><br/>
                        <span className={info.value}>{pokemon.height}</span><br/>
                        <span className={info.value}>{pokemon.weight}</span><br/>
                    </div>
                </div>
            </div>
        </div>
    )
}