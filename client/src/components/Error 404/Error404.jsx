import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import error404 from "../../assets/img/404.png";
import { cleanCache } from "../../actions/index";
import "./Error404.css";
import { Link } from "react-router-dom";
import getPokemons from "../../actions/index";

export default function Error404() {
  const history = useNavigate();
  const dispatch = useDispatch();

  // let handleClick = () => {

  //   dispatch(cleanCache());
  //   history("/home");
  // };
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div className="contenedor404">
      {/* <button onClick={handleClick} className="buttonBack button404">
        {"<-"} BACK
      </button> */}
      {/* <Link to={"/home"}>
        <button> SALIR</button>
      </Link> */}
      <img src={error404} alt="" className="error404" />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los pokemons
      </button>
    </div>
  );
}
