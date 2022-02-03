import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <div className={style.navBarContainer}>
      <SearchBar />
      <Link className={style.link} to="/pokemons">
        {" "}
        Crear pokemon{" "}
      </Link>
    </div>
  );
}
