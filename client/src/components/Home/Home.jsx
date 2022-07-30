import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getPokemons from "../../actions/index";
import { getTypes } from "../../actions/index";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import "../Home/Home.css";
import SearchBar from "../SearchBar/SearchBar";
import {
  filterByCreated,
  filterByTypes,
  orderByName,
} from "../../actions/index";
import { useNavigate } from "react-router-dom";
import Error404 from "../Error 404/Error404";

export default function Home() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.typesList);
  const allPokemons = useSelector((state) => state.pokemons);
  // const prueba = useSelector((state) => state.pokemons);
  const [order, setOrder] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina, setPokemonsPorPagina] = useState(12);
  const indiceUltimoPokemon = paginaActual * pokemonsPorPagina;
  const indicePrimerPokemon = indiceUltimoPokemon - pokemonsPorPagina;
  const loading = useSelector((state) => state.loading);

  const navigate = useNavigate();
  const pokemonsActuales = allPokemons.slice(
    indicePrimerPokemon,
    indiceUltimoPokemon
  );
  // console.log(allTypes, "SOY EL HOME");
  const paginado = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  const handlerFilterByCreated = (e) => {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setPaginaActual(() => 1);
  };
  const handlerFilterByTypes = (e) => {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
    setPaginaActual(() => 1);
  };

  function handleSort(e) {
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setPaginaActual(1);
    setOrder(`Ordenado${e.target.value}`);
  }
  return !loading ? (
    allPokemons ? (
      <div className="header">
        <Link to="/agregar">CREAR POKEMON</Link>
        <h1>PI POKEMON</h1>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar todos los pokemons
        </button>
        <div>
          <div>
            <label>Tipo de pokemon: </label>

            <select onChange={(e) => handlerFilterByTypes(e)}>
              <option value="all">all</option>
              {allTypes?.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Order: </label>
            <select onChange={(e) => handleSort(e)}>
              {/* <option value="pokedex">pokedex</option> */}
              <option value="asc">a-z</option>
              <option value="dsc">z-a</option>
            </select>
          </div>
          <div>
            <label>Tipo de creacion: </label>
            <select onChange={(e) => handlerFilterByCreated(e)}>
              <option value="all">all</option>
              <option value="existing">existing</option>
              <option value="created">created</option>
            </select>
          </div>
          <Paginado
            pokemonsPorPagina={pokemonsPorPagina}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
          <SearchBar />

          {!loading ? (
            allPokemons.length ? (
              pokemonsActuales.map((ele) => {
                return (
                  <div className="contenedorCards" key={ele.id}>
                    {/* <h5>Tipo de pokemon: </h5> */}
                    <Link to={`/pokemons/${ele.id}`}>
                      <Card
                        name={ele.name}
                        img={
                          ele.img ? (
                            ele.img
                          ) : (
                            <img
                              src="https://camo.githubusercontent.com/5d1fe59c3f0e4cfb5480bb8d8b1eb3ba58906acef846904fde8afcc5f773adbb/68747470733a2f2f692e696d6775722e636f6d2f583962314b75362e706e67"
                              alt="pokemon"
                            />
                          )
                        }
                        type={ele.type ? ele.type.join(", ") : <Error404 />}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <Error404 />
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    ) : (
      <Error404 />
    )
  ) : (
    <Loading />
  );
}
