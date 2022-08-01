import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPokemons, { getNamePokemons } from "../../actions";
// import { useNavigate } from "react-router-dom";
import styles from "../SearchBar/SearchBar.module.css";
// import setPaginaActual

// import useHistory from "react-router-dom";

export default function SearchBar({ setPaginaActual }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [paginaActual] = useState(1);
  const loading = useSelector((state) => state.loading);
  // let navigate = useNavigate();
  // let pokemon = useSelector((state) => state.pokemons);
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(getNamePokemons(name));
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
      {/* {pokemon.id && navigate(`/pokemons/${pokemon.id}`)} */}
    </div>
  );
}

// <div className="contenedorSearchbar">
//   <div className="contenedorButtonCrear">
//     <button className="buttonCrear">CREAR POKÉMON</button>
//   </div>

//   <form
//     className="contenedorButtonSearch"
//     onSubmit={(e) => handleSubmit(e)}
//   >
//     <input
//       className="inputSearch"
//       type="text"
//       placeholder="Buscar..."
//       onChange={(e) => handleInputChange(e.target.value?.toLowerCase())}
//     />
//     <button
//       disabled={name.length === 0}
//       type="submit"
//       className="buttonSearch"
//     >
//       Buscar
//     </button>
//   </form>

//   {/* {pokemons.id && <Redirect to={`/pokemons/${pokemons.id}`} />} */}
// </div>
