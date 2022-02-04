import React from "react";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterPokemonsByType,
  filterCreated,
  orderByName,
  orderByStrange,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allPokemonsFilter = useSelector((state) => state.filter);
  // const allTypes = useSelector((state) => state.allTypes);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonPerPage] = useState(12);
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);

  //*************************************************************************
  // ***** PARA TRAER TODOS LOS TYPES DE LOS 40 POKEMON QUE TRAE LA API + DB
  //*************************************************************************

  const objType = allPokemonsFilter.map((p) => p.types);
  const ArrType = [];
  objType.map((e) => e.forEach((l) => ArrType.push(l.name ? l.name : l)));
  const types = [...new Set(ArrType)];

  //*************************************************************************
  //*************************************************************************

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getPokemons());
  // }

  function handleFilterType(e) {
    e.preventDefault();

    dispatch(filterPokemonsByType(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();

    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  function handleSortStrange(e) {
    e.preventDefault();
    dispatch(orderByStrange(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <div className={style.homeContainer}>
      <NavBar />
      <h1> POKEMON API </h1>
      <div>
        <div>
          <select
            onChange={(e) => {
              handleSort(e);
            }}
            className={style.select}
          >
            <option className={style.optionSelect} value="abc">
              A-Z
            </option>
            <option className={style.optionSelect} value="zyx">
              Z-A
            </option>
          </select>

          <select
            onChange={(e) => {
              handleSortStrange(e);
            }}
            className={style.select}
          >
            <option className={style.optionSelect} value="fuerza-">
              Fuerza -
            </option>
            <option className={style.optionSelect} value="fuerza+">
              Fuerza +
            </option>
          </select>

          <select
            onChange={(e) => {
              handleFilterCreated(e);
            }}
            className={style.select}
          >
            <option className={style.optionSelect} value="all">
              Todos
            </option>
            <option className={style.optionSelect} value="api">
              Existente
            </option>
            <option className={style.optionSelect} value="created">
              Creado
            </option>
          </select>

          <select
            onChange={(e) => {
              handleFilterType(e);
            }}
            className={style.select}
          >
            <option value="all" className={style.optionSelect}>
              Todos
            </option>

            {types?.map((t) => (
              <option value={t} className={style.optionSelect}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />

      <div className={style.cardsContainer}>
        {currentPokemons.length < 1 ? (
          <Loading />
        ) : (
          currentPokemons?.map((p, i) => {
            return (
              <div>
                <Link className={style.link} to={`/home/${p.id}`}>
                  <Card
                    key={i}
                    name={p.name}
                    image={p.image}
                    types={p.types}
                    attack={p.attack}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div className={style.space}></div>
    </div>
  );
}
