const initialState = {
  pokemons: [],
  allPokemons: [],
  typesList: [],
};

export default function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        // typesList,
        // loading: false,
      };
    case "GET_TYPES":
      return {
        ...state,
        typesList: action.payload,
      };
    case "FILTER_BY_CREATED":
      // const allPokemons = state.allPokemons
      const createdFilter =
        action.payload === "created"
          ? state.allPokemons.filter((pokemon) => pokemon.createdInDb)
          : state.allPokemons.filter((pokemon) => !pokemon.createdInDb);
      // console.log(createdFilter.type);
      return {
        ...state,
        pokemons: createdFilter,
        // action.payload === "all" ? state.allPokemons : createdFilter,
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
            } else if (ele.type.length === 2) {
              return (
                ele.type[0].includes(action.payload) ||
                ele.type[1].includes(action.payload)
              );
            } else {
              return null;
            }
          }
        }),
      };

    default:
      return state;
  }
}
