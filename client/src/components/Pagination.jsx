import pagination from "./pagination.module.css";

export default function Pagination({pag, total, onChange}){
    

    const getPages = () => {
        const res = [];

        for(let i = 1; i <= total; i++){
            res.push(<span key={i} onClick={() => {onChange(i)}} className={pag === i ? `${pagination.num} ${pagination.active}` : pagination.num}>{i}</span>)
        }

        return res;
    }

    return(
        <div className={pagination.pagination}>
            <span>pagina {pag} de {total}</span>
            
            <div className={pagination.pages}>
                {getPages()}
            </div>
        </div>
    )
}