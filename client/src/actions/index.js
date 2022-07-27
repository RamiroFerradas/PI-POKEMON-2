import axios from "axios";

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
    console.log(json, "soy yo");
    return dispatch({
      type: "GET_TYPES",
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
