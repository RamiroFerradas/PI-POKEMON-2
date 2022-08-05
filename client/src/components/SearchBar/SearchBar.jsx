// import React from "react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getNamePokemons } from "../../actions";
// import { setLoading } from "../../actions";
// // import { useNavigate } from "react-router-dom";
// import styles from "../SearchBar/SearchBar.module.css";

// export default function SearchBar({ setPaginaActual }) {
//   const dispatch = useDispatch();
//   const [name, setName] = useState("");
//   const [paginaActual] = useState(1);

//   const allPokemons = useSelector((state) => state.pokemons);

//   function handleInputChange(e) {
//     e.preventDefault();
//     setName(e.target.value.toLowerCase());
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     dispatch(setLoading());
//     dispatch(getNamePokemons(name));
//     setPaginaActual(() => 1);

//     e.target.reset();
//   }

//   return (
//     <div>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <input
//           type="text"
//           placeholder="Buscar Pokemon"
//           onChange={(e) => handleInputChange(e)}
//           className={styles.inputBusqueda}
//         />
//       </form>
//     </div>
//   );
// }

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNamePokemonsGlobal, getNamePokemons } from "../../actions";
import { setLoading } from "../../actions";
// import { useNavigate } from "react-router-dom";
import styles from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ setPaginaActual }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [paginaActual] = useState(1);
  const flag = useSelector((state) => state.buscarApi);

  const allPokemons = useSelector((state) => state.pokemons);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setLoading());

    dispatch(getNamePokemonsGlobal(name));
    if (!flag) dispatch(getNamePokemons(name));

    setPaginaActual(() => 1);
    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Buscar Pokemon"
          onChange={(e) => handleInputChange(e)}
          className={styles.inputBusqueda}
        />
      </form>
    </div>
  );
}
