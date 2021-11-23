import loading from "./loading.module.css";

export default function Loading(){
    return(
        <div className={loading.container}>
            <img className={loading.pokeLoader} src="images/pokeLoader.gif" alt="loader"/>
            <h1>Loading...</h1>
        </div>
    )
}