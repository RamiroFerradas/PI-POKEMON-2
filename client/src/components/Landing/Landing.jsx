import React from "react";
import { Link } from "react-router-dom";
// import titulo from "../../assets/img/titulo.png";
// import titulo from "../../assets/img/pokemon-imagen-animada-0016.gif";
import titulo from "../../assets/img/pokemon-imagen-animada-0016.gif";
import "../Landing/Landing.css";

function Landing() {
  return (
    <div className="contenedorInicio">
      <p className="clickParaEmpezar">¡Clickeá para comenzar!</p>
      <Link to="/pokemons">
        <img src={titulo} alt="titulo" className="tituloInicio" />
      </Link>
      {/* <img src={ash} alt="ash" className="ash" /> */}
    </div>
  );
}

export default Landing;
