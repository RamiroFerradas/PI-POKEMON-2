import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../actions/index";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import TypesPokemonInfo from "../Paginado/Types Detail/typeDetail";
// import Loading from "../../components/Loading/Loading";

export default function DetailsPokemonPage(props) {
  // console.log(props);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // dispatch(clearDetails());
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  const pokemonInfo = useSelector((state) => state.detail);
  // const loading = useSelector((state) => state.loading);
  // console.log(pokemonInfo, "soy el componente");
  console.log(pokemonInfo.type);

  return (
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
            {/* <TypesPokemonInfo types={pokemonInfo.types} /> */}
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
                <p>Type: {pokemonInfo.type}</p>
              </div>
            </div>
          </div>
          <Link to="/pokemons">
            <button>Volver</button>
          </Link>
        </div>
      }
    </div>
  );
}
