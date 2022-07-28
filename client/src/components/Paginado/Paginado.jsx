import React from "react";
import "./Paginado.css";
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
    <nav className="contenedorPaginado">
      <ul className="ul">
        {numeroPagina?.map((number) => {
          return (
            <li className="li" key={number}>
              <button
                enabled={`background-color: black`}
                className="button1"
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
