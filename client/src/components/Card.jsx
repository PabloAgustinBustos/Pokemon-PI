import card from "./card.module.css"

export default function Card({image, name, types}){
    console.log(name + ": " + types)
    return(
        <div className={card.card} onClick={e => {
            console.log(e.target.classList[1])
        }}>
            <img className={`${card.image} ${name}`} src={image || "images/who_is_that.png"} alt="sprite"/>
            <h2 className={`${card.name} ${name}`}>{name}</h2>

            <br/>

            <div className={`${card.types} ${name}`}>
                {types?.map(t => <span key={t.name}>{t.name}</span>)}
            </div>
        </div>
    )
}