import pokeContainer from "./pokeContainer.module.css"

export default function PokeContainer({children}){
    return(
        <div className={pokeContainer.container}>
            {children}
        </div>
    )
}