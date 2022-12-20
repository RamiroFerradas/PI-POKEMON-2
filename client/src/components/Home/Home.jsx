import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes } from "../../actions/index";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import Error404 from "../Error 404/Error404";
import styles from "../Home/Home.module.css";
import getPokemons from "../../actions/index";

//actions
import {
  filterByCreated,
  filterByTypes,
  orderByName,
  filterByStrength,
  recargarPokemons,
} from "../../actions/index";

export default function Home() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.typesList);
  const allPokemons = useSelector((state) => state.pokemons);

  const [order, setOrder] = useState("");

  //paginado
  const [paginaActual, setPaginaActual] = useState(1);
  // const paginaActual = useSelector((state) => state.paginaActual);
  const [pokemonsPorPagina] = useState(12);
  const indiceUltimoPokemon = paginaActual * pokemonsPorPagina;
  const indicePrimerPokemon = indiceUltimoPokemon - pokemonsPorPagina;
  const loading = useSelector((state) => state.loading);
  const pokemonsActuales = allPokemons.slice(
    indicePrimerPokemon,
    indiceUltimoPokemon
  );

  // const setPaginaActual = (number) => {
  //   dispatch(setPage(number));
  // };

  const paginado = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };
  //paginado

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  //handlers
  const handleClick = (e) => {
    e.preventDefault();
    // dispatch(getPokemons());
    dispatch(recargarPokemons());
    setPaginaActual(() => 1);
  };
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
  const handlerFilterByStrength = (e) => {
    e.preventDefault();
    dispatch(filterByStrength(e.target.value));
    setPaginaActual(() => 1);
  };

  const handleSort = (e) => {
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setPaginaActual(1);
    setOrder(`Ordenado${e.target.value}`);
  };

  return !loading ? (
    pokemonsActuales.length ? (
      <div className={styles.header}>
        <div className={styles.parent}>
          {/* <div className={styles.divTitulo}> */}
          <h1 className={styles.titulo}>POKEAPP</h1>
          {/* </div> */}
          <div className={styles.divCrear}>
            <div className={styles.divButtonCreate}>
              <Link to="/agregar">
                <button className={styles.buttonCrear}>
                  <span>CREAR POKEMON</span>
                </button>
              </Link>
            </div>

            {/* </div> */}
            <div className={styles.divButtonRecarga}>
              <button
                className={styles.buttonCarga}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                <span>recargar pokemons</span>
              </button>
            </div>
            {/* <div className={styles.divSearchBar}> */}
            <SearchBar setPaginaActual={setPaginaActual} />
          </div>
        </div>

        <div className={styles.parentFiltros}>
          <div className={styles.divTipos}>
            <label className={styles.fontFiltros}>Tipo de pokemon: </label>

            <select onChange={(e) => handlerFilterByTypes(e)}>
              <option value="all">todos</option>
              {allTypes?.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.divOrdenAZ}>
            <label className={styles.fontFiltros}>Orden alfabetico: </label>
            <select
              className={styles.selectOrderAz}
              onChange={(e) => handleSort(e)}
            >
              {/* <option value="pokedex">pokedex</option> */}
              <option value="asc">a-z</option>
              <option value="dsc">z-a</option>
            </select>
          </div>

          <div className={styles.divCreacion}>
            <label className={styles.fontFiltros}>Tipo de creacion: </label>
            <select onChange={(e) => handlerFilterByCreated(e)}>
              <option value="all">todos</option>
              <option value="existing">existente</option>
              <option value="created">creado</option>
            </select>
          </div>
          <div className={styles.divOrdenAtaque}>
            <label className={styles.fontFiltros}>Tipo de fuerza: </label>
            <select onChange={(e) => handlerFilterByStrength(e)}>
              <option value="default">por defecto</option>
              <option value="stronger">fuerte</option>
              <option value="weaker">debil</option>
              <option value="5 stronger">5 MAS FUERTES</option>
            </select>
          </div>
        </div>
        <div className={styles.container}>
          {" "}
          {allPokemons.length
            ? pokemonsActuales.map((ele) => {
                return (
                  <div key={ele.id}>
                    <Link to={`/pokemons/${ele.id}`}>
                      <Card name={ele.name} img={ele.img} type={ele.type} />
                    </Link>
                  </div>
                );
              })
            : setTimeout(() => {
                if (pokemonsActuales.length) {
                  <Error404 />;
                }
              }, 1000)}
        </div>

        <div className={styles.paginadoHome}>
          <Paginado
            pokemonsPorPagina={pokemonsPorPagina}
            allPokemons={allPokemons.length}
            paginado={paginado}
            paginaActual={paginaActual}
          />
          D
        </div>
      </div>
    ) : (
      <Error404 />
    )
  ) : (
    <Loading />
  );
}
