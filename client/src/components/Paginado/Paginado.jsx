import React from "react";
// import "./Paginado.css";
import styles from "../Paginado/Paginado.module.css";

export default function Paginado({ pokemonsPorPagina, allPokemons, paginado }) {
  // let currentPage = useSelector((state) => state.page);
  let numeroPagina = [];
  //   let pokesPerPage = 12;
  let totalPages = Math.ceil(allPokemons / pokemonsPorPagina);
  //   let dispatch = useDispatch();

  for (let i = 1; i <= totalPages; i++) {
    numeroPagina.push(i);
  }
  return (
    <nav className={styles.contenedorPaginado}>
      <ul className="ul">
        {numeroPagina?.map((number) => {
          return (
            // < className="li" key={number}>
            <button
              key={number}
              enabled={`background-color: black`}
              className={styles.buttonPaginado}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
            //
          );
        })}
      </ul>
    </nav>
  );
}
