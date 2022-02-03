import React from "react";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={style.searchBarContainer}>
      <input className={style.inputSearch} type="text" placeholder="Search" />
      <button className={style.buttonSearch} type="submit">
        {" "}
        Search
      </button>
    </div>
  );
}
