// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentPage } from "../../actions";
// // import "./Paginacion.css";

// export default function Paginacion({ allPokes }) {
//   let currentPage = useSelector((state) => state.page);
//   let pageNumbers = [];
//   let pokesPerPage = 12;
//   let totalPages = Math.ceil(allPokes / pokesPerPage);
//   let dispatch = useDispatch();

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className="contenedorPaginado">
//       <ul>
//         <button
//           disabled={currentPage - 1 === 0}
//           onClick={() => dispatch(setCurrentPage(currentPage - 1))}
//         >
//           PREV
//         </button>
//         {pageNumbers?.map((num) => {
//           return (
//             <li key={num}>
//               <button
//                 className={currentPage === num ? "btnActive" : "btnPagination"}
//                 onClick={() => dispatch(setCurrentPage(num))}
//               >
//                 {num}
//               </button>
//             </li>
//           );
//         })}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => dispatch(setCurrentPage(currentPage + 1))}
//         >
//           NEXT
//         </button>
//       </ul>
//     </nav>
//   );
// }

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
  // console.log(numeroPagina);
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
