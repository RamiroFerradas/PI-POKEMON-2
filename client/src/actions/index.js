// import axios from "axios";
// // import Loading from "../components/Loading/Loading";

// export default function getPokemons() {
//   return async function (dispatch) {
//     var json = await axios("http://localhost:3001/pokemons", {});
//     return dispatch({
//       type: "GET_POKEMONS",
//       payload: json.data,
//     });
//   };
// }
// export function getTypes() {
//   return async function (dispatch) {
//     var json = await axios("http://localhost:3001/types", {});
//     return dispatch({
//       type: "GET_TYPES",
//       payload: json.data,
//     });
//   };
// }
// export function deletePokemon(id) {
//   return async function (dispatch) {
//     const json = await axios.delete(`http://localhost:3001/pokemons/${id}`);
//     return dispatch({
//       type: "DELETE_POKEMON",
//       payload: json.data,
//     });
//   };
// }

// export function filterByCreated(payload) {
//   return {
//     type: "FILTER_BY_CREATED",
//     payload,
//   };
// }

// export function filterByTypes(payload) {
//   return {
//     type: "FILTER_BY_TYPES",
//     payload,
//   };
// }
// export function filterByStrength(payload) {
//   return {
//     type: "FILTER_BY_STRENGTH",
//     payload,
//   };
// }

// export function orderByName(payload) {
//   return {
//     type: "ORDER_BY_NAME",
//     payload,
//   };
// }

// export function getNamePokemons(name) {
//   return async function (dispatch) {
//     try {
//       var json = await axios(`http://localhost:3001/pokemons?name=${name}`);
//       return dispatch({
//         type: "GET_NAME_POKEMONS",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//       return alert("No existe el nombre del pokemon solicitado");
//     }
//   };
// }

// export function postPokemon(payload) {
//   return async function (dispatch) {
//     const json = await axios.post(`http://localhost:3001/pokemons`, payload);
//     return json;
//   };
// }

// export function getPokemonDetail(id) {
//   return async function (dispatch) {
//     try {
//       var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
//       return dispatch({
//         type: "GET_POKEMONS_DETAILS",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log("error", error);
//       // return <button>Regresar</button>;
//       return alert("No existe el id del pokemon solicitado");
//     }
//   };
// }

// export function cleanCache() {
//   return {
//     type: "CLEAN_CACHE",
//   };
// }

// export function cleanCacheAll() {
//   return {
//     type: "CLEAN_CACHE_ALL",
//   };
// }

// export function err404() {
//   return {
//     type: "ERROR_404",
//   };
// }

import axios from "axios";
// import Loading from "../components/Loading/Loading";

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

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/pokemons?name=${name}`);

      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return alert("No existe el nombre del pokemon solicitado");
    }
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const json = await axios.post(`http://localhost:3001/pokemons`, payload);
    return json;
  };
}

export function getPokemonDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: "GET_POKEMONS_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log("error", error);
      // return <button>Regresar</button>;
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
