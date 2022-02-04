import React from "react";
import style from "./Card.module.css";
import img from "./iconoespada.png";

export default function Card({ name, types, image, attack }) {
  let typePokemon = types.map((e, i) => {
    const nameType = e.name ? e.name : e;
    return <h5 key={i}>{nameType}</h5>;
  });
  return (
    <div className={style.card}>
      <h3>{name}</h3>
      <img className={style.img} src={image} alt="img not found" />
      <div className={style.type}>{typePokemon}</div>
      <div className={style.stat}>
        <img className={style.icono} src={img} alt="" />
        <h3>{attack}</h3>
      </div>
    </div>
  );
}
