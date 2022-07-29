import axios from "axios";
import Loading from "../components/Loading/Loading";

export default function getPokemons() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/pokemons", {});
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/types", {});
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}
export function deletePokemon(id) {
  return async function (dispatch) {
    const json = await axios.delete(`http://localhost:3001/pokemons/${id}`);
    return dispatch({
      type: "DELETE_POKEMON",
      payload: json.data,
    });
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function filterByTypes(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/pokemons?name=${name}`);
      if (!json) return <Loading />;
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const json = await axios.post(`http://localhost:3001/pokemons`, payload);
    console.log(json);
    return json;
  };
}

export function getPokemonDetail(id) {
  return async function (dispatch) {
    try {
      console.log("soy el actions");
      var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: "GET_POKEMONS_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
}

export function cleanCache() {
  return {
    type: "CLEAN_CACHE",
  };
}

export function cleanCacheAll() {
  return {
    type: "CLEAN_CACHE_ALL",
  };
}
