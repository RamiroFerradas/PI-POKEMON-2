const initialState = {
  pokemons: [],
  allPokemons: [],
  typesList: [],
  detail: {},
  search: [],
  loading: true,
  buscarApi: false,
  // paginaActual: 1,
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
      let currentPokemons2 = [...state.pokemons];
      if (action.payload === "default") {
        return {
          ...state,
          pokemons: state.allPokemons,
        };
      }
      if (action.payload === "stronger") {
        const currentPokemons3 = [...state.allPokemons];
        currentPokemons3.sort((obj1, obj2) => {
          if (obj1.attack < obj2.attack) {
            return 1;
          } else if (obj1.attack > obj2.attack) {
            return -1;
          } else {
            return 0;
          }
        });
        currentPokemons2 = currentPokemons3;
      }
      if (action.payload === "weaker") {
        let currentPokemons3 = [...state.allPokemons];
        currentPokemons3.sort((obj1, obj2) => {
          if (obj1.attack < obj2.attack) {
            return -1;
          } else if (obj1.attack > obj2.attack) {
            return 1;
          } else {
            return 0;
          }
        });
        currentPokemons2 = currentPokemons3;
      }
      if (action.payload === "5 stronger") {
        currentPokemons2.sort((obj1, obj2) => {
          if (obj1.attack < obj2.attack) {
            return 1;
          } else if (obj1.attack > obj2.attack) {
            return -1;
          } else {
            return 0;
          }
        });
        let a = currentPokemons2.slice(0, 5);

        return {
          ...state,
          pokemons: a,
        };
      }
      return {
        ...state,
        pokemons: currentPokemons2,
      };

    case "DELETE_POKEMON":
      return {
        ...state,
      };
    case "GET_POKEMONS_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    case "CLEAN_CACHE":
      return {
        ...state,
        // pokemons: state.allPokemons,
        // pokemons: [],
        detail: {},
        loading: true,
      };

    case "CLEAN_CACHE_ALL":
      return {
        ...state,
        // pokemons: state.allPokemons,
        // pokemons: [],
        detail: {},
        loading: true,
        pokemons: [],
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

    case "BACK":
      return {
        ...state,
        pokemons: [state.allPokemons],
      };

    // case "SET_CURRENT_PAGE":
    //   console.log(action.type, action.payload);

    //   return {
    //     ...state,
    //     page: action.number,
    //   };

    case "GET_POKEMON_NAME_GLOBAL":
      const unPoke = state.allPokemons;
      const filter = unPoke.filter((ele) =>
        ele.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      // console.log(unPoke);
      if (filter === 0) {
        return {
          ...state,
          buscarApi: true,
        };
      }

      return {
        ...state,
        pokemons: filter,
        loading: false,
      };
    case "GET_NAME_POKEMONS":
      if (action.payload.msj) {
        let error = { error: "No se encontró el pokémon" };
        return {
          ...state,
          pokemon: error,
          loading: false,
          flag: false,
        };
      }
      return {
        ...state,
        pokemons: action.payload,
        loading: false,
      };

    case "RECARGAR_POKEMONS":
      return {
        ...state,
        pokemons: state.allPokemons,
      };

    default:
      return state;
  }
}
