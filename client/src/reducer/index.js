const initialState = {
  pokemons: [],
  allPokemons: [],
  allTypes: [],
  filter: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        filter: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        allTypes: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;

      const typeFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((p) =>
              p.types.some(
                (t) => t === action.payload || t.name === action.payload
              )
            );
      console.log("soy typeFiltered", typeFiltered);
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "FILTER_CREATED":
      const allPokemons2 = state.allPokemons;
      const createdPokemons =
        action.payload === "created"
          ? allPokemons2.filter((p) => p.createInDb)
          : allPokemons2.filter((p) => !p.createInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? allPokemons2 : createdPokemons,
      };
    case "ORDER_BY_NAME":
      const allPokemons3 = state.allPokemons;
      const orderPokemonByName =
        action.payload === "abc"
          ? allPokemons3.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : allPokemons3.sort(function (a, b) {
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
        pokemons: orderPokemonByName,
      };

    case "ORDER_BY_STRANGE":
      const allPokemons4 = state.allPokemons;
      const orderPokemonByStrange =
        action.payload === "fuerza-"
          ? allPokemons4.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : allPokemons4.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: orderPokemonByStrange,
      };

    case "SEARCH_BY_NAME":
      console.log("SOY EL ACTION PAYLOAD", action.payload);
      return {
        ...state,
        pokemons: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
