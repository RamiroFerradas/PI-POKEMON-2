import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNamePokemons } from "../../actions";
import Loading from "../Loading/Loading";
import "./SearchBar.css";

// import useHistory from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const loading = useSelector((state) => state.loading);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      alert("Debes de ingresar el nombre del pokemon que deseas buscar");
    } else {
      dispatch(getNamePokemons(name));
      setPaginaActual(() => 1);
      e.target.reset();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar Pokemon"
          onChange={handleInputChange}
          className="input"
          // disabled={!name}
        />
        {/* <button disabled={!name} type="submit">
          Buscar
        </button> */}
      </form>
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
