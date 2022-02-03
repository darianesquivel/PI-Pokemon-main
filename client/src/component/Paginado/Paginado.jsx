import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={style.list}>
        {pageNumbers?.map((n) => (
          <li className={style.listItem} key={n}>
            <a onClick={() => paginado(n)}>{n}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}