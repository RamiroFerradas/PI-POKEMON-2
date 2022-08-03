import React from "react";
import styles from "../Paginado/Paginado.module.css";

export default function Paginado({
  pokemonsPorPagina,
  allPokemons,
  paginado,
  paginaActual,
}) {
  let numeroPagina = [];
  let totalPages = Math.ceil(allPokemons / pokemonsPorPagina);

  for (let i = 1; i <= totalPages; i++) {
    numeroPagina.push(i);
  }
  console.log(numeroPagina);
  return (
    <nav className={styles.contenedorPaginado}>
      {numeroPagina?.map((number) => {
        return (
          <button
            key={number}
            className={
              number !== paginaActual
                ? styles.buttonPaginado
                : styles.buttonPaginado2
            }
            onClick={() => paginado(number)}
          >
            {number}
          </button>
        );
      })}
    </nav>
  );
}
