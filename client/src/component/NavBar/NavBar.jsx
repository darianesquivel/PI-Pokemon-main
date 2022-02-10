import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import globalStyle from "../globalStyle.module.css";
import { getPokemons } from "../../actions";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div className={style.navBarContainer}>
      <Link className={globalStyle.eightbitbtn} to="/pokemons">
        {" "}
        Create pokemon{" "}
      </Link>
      <SearchBar />
      <button
        onClick={(e) => handleClick(e)}
        className={globalStyle.eightbitbtn}
        type="submit"
      >
        Recharge
      </button>
    </div>
  );
}
