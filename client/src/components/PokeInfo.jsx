import { useParams } from "react-router"

export default function PokeInfo(){
    const params = useParams();

    console.log(params)
    
    return(
        <div>
            <h1>hola</h1>
        </div>
    )
}