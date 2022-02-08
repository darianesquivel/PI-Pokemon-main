import React from "react";
import style from "./Card.module.css";
import img from "./iconoespada.png";
import "./Card.css";

export default function Card({ name, types, image, attack }) {
  let typePokemon = types.map((e, i) => {
    const nameType = e.name ? e.name : e;
    return (
      <h5 key={i} className={style.type}>
        {nameType}
      </h5>
    );
  });

  let styleType = typePokemon[0].props.children;
  let card = "card";
  return (
    <div className={`${card} ${styleType}`}>
      <h3>{name}</h3>
      <img className={style.img} src={image} alt="img not found" />
      <div className={style.typeContainer}>{typePokemon}</div>
      <div className={style.stat}>
        <img className={style.icono} src={img} alt="" />
        <h3>{attack}</h3>
      </div>
    </div>
  );
}
