import card from "./card.module.css"

export default function Card({image, name, types}){
    return(
        <div className={card.card}>
            <img className={card.image} src={image || "images/who_is_that.png"} alt="sprite"/>
            <h2 className={card.name}>{name}</h2>

            <br/>

            <div className={card.types}>
                {types?.map(t => <span key={t.name}>{t.name}</span>)}
            </div>
        </div>
    )
}