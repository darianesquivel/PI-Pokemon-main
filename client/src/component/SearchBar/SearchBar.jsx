import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    console.log("se ejecuto handleSubmit con name ", name);
    dispatch(searchByName(name));
    setName("");
  }

  return (
    <div className={style.searchBarContainer}>
      <input
        onChange={(e) => handleInputChange(e)}
        className={style.inputSearch}
        type="text"
        placeholder="search..."
        value={name}
      />
      <button
        onClick={(e) => handleSubmit(e)}
        className={style.buttonSearch}
        type="submit"
      >
        Search
      </button>
    </div>
  );
}
