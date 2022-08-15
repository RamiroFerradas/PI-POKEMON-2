import axios from "axios";
// import Loading from "../components/Loading/Loading";

export default function getPokemons() {
  return async function (dispatch) {
    var json = await axios("/pokemons", {});
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    var json = await axios("/types", {});
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}
export function deletePokemon(id) {
  return async function (dispatch) {
    const json = await axios.delete(`/pokemons/${id}`);
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
export function filterByStrength(payload) {
  return {
    type: "FILTER_BY_STRENGTH",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    let json = await axios(`pokemons/${name}`);
    return dispatch({
      type: "GET_NAME_POKEMONS",
      payload: json.data,
    });
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      let json = axios.post(`/pokemons`, payload);
      return json;
    } catch (error) {
      console.log(error.message, "Error en el post");
    }
  };
}

export function getPokemonDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/pokemons/${id}`);
      console.log(json);
      return dispatch({
        type: "GET_POKEMONS_DETAILS",
        payload: json.data[0],
      });
    } catch (error) {
      console.log("error", error);
      return alert("No existe el id del pokemon solicitado");
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

export function err404() {
  return {
    type: "ERROR_404",
  };
}

export function setLoading() {
  return {
    type: "SET_LOADING",
  };
}
export function back() {
  return {
    type: "BACK",
  };
}

// export function setCurrentPage(payload) {
//   console.log(payload, "holaaa");
//   return function (dispatch) {
//     return dispatch({
//       type: "SET_CURRENT_PAGE",
//       payload: payload,
//     });
//   };
// }
export const setCurrentPage = (payload) => {
  return { type: "SET_CURRENT_PAGE", payload };
};

export function getNamePokemonsGlobal(name) {
  return function (dispatch) {
    return dispatch({
      type: "GET_POKEMON_NAME_GLOBAL",
      payload: name,
    });
  };
}

export function recargarPokemons() {
  return {
    type: "RECARGAR_POKEMONS",
  };
}
