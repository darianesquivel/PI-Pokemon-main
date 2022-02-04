import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var pokemons = await axios.get("http://localhost:3001/pokemon");

    return dispatch({
      type: "GET_POKEMONS",
      payload: pokemons.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    var types = await axios.get("http://localhost:3001/type");

    return dispatch({
      type: "GET_TYPES",
      payload: types.data,
    });
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByStrange(payload) {
  return {
    type: "ORDER_BY_STRANGE",
    payload,
  };
}

export function searchByName(payload) {
  return async function (dispatch) {
    try {
      var pokemonSearch = await axios.get(
        `http://localhost:3001/pokemon?name=${payload}`
      );

      console.log("SEARCH_BY_NAME", pokemonSearch.data);
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: pokemonSearch.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const pokemonCreate = axios.post("http://localhost:3001/pokemon/", payload);
    console.log("soy pokemon create", pokemonCreate);
    return pokemonCreate;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var pokemonDetail = await axios.get(
        `http://localhost:3001/pokemon/${id}`
      );
      console.log("EL POKEMON LLEGO A ACTIONS ", pokemonDetail.data);
      return dispatch({
        type: "GET_DETAIL",
        payload: pokemonDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
    payload: [],
  };
}
