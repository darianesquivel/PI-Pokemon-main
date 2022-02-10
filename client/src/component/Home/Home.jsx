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
import Footer from "../Footer/Footer";
import gif from "./pokemonnotfound.gif";
import imgUn from "./pokemonUnknow.svg";

export default function Home() {
  const dispatch = useDispatch();
  let allPokemons = useSelector((state) => state.pokemons);
  const allPokemonsFilter = useSelector((state) => state.filter);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonPerPage] = useState(12);
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  let currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);

  // ********************************************************************
  // **          TYPES DE LOS 40 POKEMONS API + BASE DE DATOS          **
  // ********************************************************************

  const objType = allPokemonsFilter.map((p) => p.types);
  const ArrType = [];
  objType.map((e) => e.forEach((l) => ArrType.push(l.name ? l.name : l)));
  const types = [...new Set(ArrType)];

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ********************************
  // **          USE EFFECT        **
  // ********************************

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  // ********************************
  // **          HANDLERS          **
  // ********************************

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
      <h1> 8-BIT POKEMON API </h1>
      <NavBar />
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
              Attack -
            </option>
            <option className={style.optionSelect} value="fuerza+">
              Attack +
            </option>
          </select>

          <select
            onChange={(e) => {
              handleFilterCreated(e);
            }}
            className={style.select}
          >
            <option className={style.optionSelect} value="all">
              All
            </option>
            <option className={style.optionSelect} value="api">
              Pokedex
            </option>
            <option className={style.optionSelect} value="created">
              Created
            </option>
          </select>
          <select
            onChange={(e) => {
              handleFilterType(e);
            }}
            className={style.select}
          >
            <option value="all" className={style.optionSelect}>
              All
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
        {currentPokemons === "not found" ? (
          <div>
            <img src={gif} alt="" width="200px" />
            <h2>POKEMON NOT FOUND</h2>
          </div>
        ) : currentPokemons.length < 1 ? (
          <div>
            {" "}
            <Loading />{" "}
          </div>
        ) : (
          currentPokemons?.map((p, i) => {
            return (
              <div>
                <Link className={style.link} to={`/pokemon/${p.id}`}>
                  <Card
                    key={i}
                    name={p.name}
                    image={p.image ? p.image : imgUn}
                    types={p.types}
                    attack={p.attack}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />
      <Footer />
    </div>
  );
}
