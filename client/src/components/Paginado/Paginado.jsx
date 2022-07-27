import React from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
// import { setCurrentPage } from "../../redux/actions";
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

//   return (
//     <nav className="contenedorPaginado">
//       <ul>
//         <button
//           disabled={numeroPagina - 1 === 0}
//           onClick={() => dispatch(setCurrentPage(currentPage - 1))}
//         >
//           PREV
//         </button>
//         {numeroPagina?.map((num) => {
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
//   )
// }
