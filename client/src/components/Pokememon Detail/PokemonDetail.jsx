import React from "react";

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
import styles from "../Pokememon Detail/PokemonDetail.module.css";

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
  // const loading = useSelector((state) => state.loading);

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
  console.log(pokemonInfo, "soy pokemonInfo");
  return pokemon ? (
    pokemonInfo.img ? (
      <div>
        {
          <div>
            <div className={styles.detailCard}>
              <img
                src={pokemonInfo.img}
                alt={pokemonInfo.name}
                className={styles.imgDetail}
              />
              <div className={styles.detalles}>
                <h1 className={styles.fontDetail}>{pokemonInfo.name}</h1>
                <p className={styles.fontDetail}>ID: {pokemonInfo.id}</p>
                <div>
                  <p className={styles.fontDetail}>HP: {pokemonInfo.hp}</p>
                  <p className={styles.fontDetail}>
                    Attack: {pokemonInfo.attack}
                  </p>
                </div>
                <div>
                  <p className={styles.fontDetail}>
                    Defense: {pokemonInfo.defense}
                  </p>
                  <p className={styles.fontDetail}>
                    Speed: {pokemonInfo.speed} km/h
                  </p>
                </div>
                <div>
                  <p className={styles.fontDetail}>
                    Height: {pokemonInfo.height} m
                  </p>
                </div>
                <div>
                  <p className={styles.fontDetail}>
                    {" "}
                    Weight: {pokemonInfo.weight} kg
                  </p>
                </div>
                <div>
                  <p className={styles.fontDetail}>
                    Type:{" "}
                    {pokemonInfo.createdInDb
                      ? pokemonInfo.tipos.map((ele) => ele.name).join(", ")
                      : pokemonInfo.type.join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button onClick={cleanAndBack} className={styles.buttonBack}>
                {"<-"} VOLVER
              </button>
            </div>
          </div>
        }
        {pokemonInfo.createdInDb && (
          <div className="contenedorDelete">
            {/* <button
              onClick={() => handleDelete()}
              className={styles.buttonDelete}
            >
              BORRAR
            </button> */}
            <button
              class="noselect"
              onClick={() => handleDelete()}
              className={styles.buttonDelete}
            >
              <span className={styles.text}>Delete</span>
              <span className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
              </span>
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
