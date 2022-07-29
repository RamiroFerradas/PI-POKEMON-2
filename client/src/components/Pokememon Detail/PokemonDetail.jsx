import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonDetail,
  deletePokemon,
  cleanCache,
  cleanCacheAll,
} from "../../actions/index";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error404 from "../Error 404/Error404";
// import TypesPokemonInfo from "../Paginado/Types Detail/typeDetail";
// import Loading from "../../components/Loading/Loading";

export default function DetailsPokemonPage(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemon = useSelector((state) => state.allPokemons);

  useEffect(() => {
    // dispatch(clearDetails());
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  const pokemonInfo = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);

  let cleanAndBack = () => {
    navigate("/home");
    dispatch(cleanCache());
  };

  let handleDelete = () => {
    navigate("/home");
    alert("¡Pokémon eliminado!");
    dispatch(cleanCache());
    dispatch(cleanCacheAll());
    dispatch(deletePokemon(id));
  };

  return pokemon ? (
    pokemonInfo.img ? (
      <div>
        {
          <div>
            <div>
              <img
                src={pokemonInfo.img}
                alt={pokemonInfo.name}
                width="500px"
                height="700px"
              />
            </div>
            <div>
              <div>
                <h1>{pokemonInfo.name}</h1>
                <p>ID: {pokemonInfo.id}</p>
                <div>
                  <p>HP: {pokemonInfo.hp}</p>
                  <p>Attack: {pokemonInfo.attack}</p>
                </div>
                <div>
                  <p>Defense: {pokemonInfo.defense}</p>
                  <p>Speed: {pokemonInfo.speed} km/h</p>
                </div>
                <div>
                  <p>Height: {pokemonInfo.height} m</p>
                </div>
                <div>
                  <p>Weight: {pokemonInfo.weight} kg</p>
                </div>
                <div>
                  <p>Type: {pokemonInfo.type + " "}</p>
                </div>
              </div>
            </div>
            <button onClick={cleanAndBack} className="buttonBack">
              {"<-"} BACK
            </button>
          </div>
        }
        {pokemonInfo.createdInDb && (
          <div className="contenedorDelete">
            <button onClick={() => handleDelete()} className="btnDelete">
              BORRAR
            </button>
          </div>
        )}
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Error404 />
  );
}
