import React from "react";
import style from "./Paginado.module.css";
import globalStyle from "../globalStyle.module.css";
export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.listContainer}>
      <ul className={style.list}>
        {pageNumbers?.map((n) => (
          <li
            className={globalStyle.eightbitbtn2}
            key={n}
            onClick={() => paginado(n)}
          >
            {n}
          </li>
        ))}
      </ul>
    </nav>
  );
}
