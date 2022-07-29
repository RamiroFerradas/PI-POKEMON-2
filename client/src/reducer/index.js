const initialState = {
  pokemons: [],
  allPokemons: [],
  typesList: [],
  detail: {},
  page: 1,
  loading: true,
};

export default function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        loading: false,
        // detail: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        typesList: action.payload,
        // loading: false,
      };
    case "FILTER_BY_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allPokemons.filter((pokemon) => pokemon.createdInDb)
          : state.allPokemons.filter((pokemon) => !pokemon.createdInDb);

      return {
        ...state,
        pokemons: createdFilter,
        loading: false,
      };

    case "FILTER_BY_TYPES":
      return {
        ...state,

        pokemons: state.allPokemons.filter((ele) => {
          if (action.payload === "all") {
            return state.allPokemons;
          } else {
            // console.log(ele.type);
            if (ele.type.length === 1) {
              return ele.type[0] === action.payload;
            }
            if (ele.type.length === 2) {
              return (
                ele.type[0]?.name === action.payload ||
                ele.type[1]?.name === action.payload
              );
            } else {
              console.log("soy el else");
              return alert(`No hay pokémons de tipo ${action.payload}`);
            }
          }
        }),
        loading: false,
      };
    case "ORDER_BY_NAME":
      let arrayOrdenamiento =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        pokemons: arrayOrdenamiento,
      };

    case "GET_NAME_POKEMONS":
      if (action.payload.msj) {
        let error = { error: "No se encontró el pokémon" };
        return {
          ...state,
          pokemon: error,
          page: 1,
          loading: false,
        };
      }
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };
    case "DELETE_POKEMON":
      return {
        ...state,
      };
    case "GET_POKEMONS_DETAILS":
      return {
        ...state,
        detail: action.payload,
        loading: false,
        // loading: false,
      };

    case "CLEAN_CACHE":
      return {
        ...state,
        // allPokemons: [],
        // pokemons: [],
        detail: {},
        page: 1,
        loading: true,
      };

    case "CLEAN_CACHE_ALL":
      return {
        ...state,
        pokemons: [],
        allPokemons: [],
        detail: {},
        loading: true,
        // page: 1,
      };

    default:
      return state;
  }
}
