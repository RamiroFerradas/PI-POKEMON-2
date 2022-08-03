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
            if (ele.type.length === 1) {
              return ele.type[0].includes(action.payload);
            }
            if (ele.type.length === 2) {
              return (
                ele.type[0].includes(action.payload) ||
                ele.type[1].includes(action.payload)
              );
            } else {
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
    case "FILTER_BY_STRENGTH":
      const currentPokemons2 = [...state.pokemons];
      if (action.payload === "default") {
        currentPokemons2.sort((obj1, obj2) => {
          if (obj1.id < obj2.id) {
            return -1;
          } else {
            return 1;
          }
        });
      }
      if (action.payload === "stronger") {
        currentPokemons2.sort((obj1, obj2) => {
          if (obj1.attack < obj2.attack) {
            return 1;
          } else if (obj1.attack > obj2.attack) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      if (action.payload === "weaker") {
        currentPokemons2.sort((obj1, obj2) => {
          if (obj1.attack < obj2.attack) {
            return -1;
          } else if (obj1.attack > obj2.attack) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return {
        ...state,
        pokemons: currentPokemons2,
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
        loading: false,
      };

    // case "POST_POKEMON":
    //   console.log("soy el reducer");
    //   return {
    //     ...state,
    //     pokemons: action.payload,
    //   };

    case "DELETE_POKEMON":
      return {
        ...state,
      };
    case "GET_POKEMONS_DETAILS":
      return {
        ...state,
        detail: action.payload,
        // loading: true,
        // loading: false,
      };

    case "CLEAN_CACHE":
      return {
        ...state,
        // allPokemons: [],
        pokemons: [],
        detail: {},
        page: 1,
        loading: true,
      };

    case "CLEAN_CACHE_ALL":
      return {
        ...state,
        pokemons: [],
        page: 1,
        // page: 1,
      };
    case "ERROR_404":
      return {
        ...state,
        pokemons: state.allPokemons,
      };

    case "SET_LOADING":
      const estadoDelestado = state.loading;
      if (estadoDelestado === true) {
        return {
          ...state,
          loading: false,
        };
      } else {
        return {
          ...state,
          loading: true,
        };
      }

    default:
      return state;
  }
}
