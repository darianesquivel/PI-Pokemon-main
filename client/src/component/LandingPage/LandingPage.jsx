import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import gif from "./pikachu.gif";
import gif2 from "./bulbasaur.gif";

const cta = "< ingresar >";

export default function LandingPage() {
  return (
    <div className={style.LangindContainer}>
      <h1> POKEMON API </h1>
      <Link to="/home" className={style.btnLink}>
        <div className={style.btnCtaContainer}>
          <img src={gif} alt="" />
          <button className={style.btnCta}> {cta} </button>
        </div>
      </Link>

      <p className={style.by}>
        developed by @dN - 2{" "}
        <span className={style.gif2}>
          <img src={gif2} alt="" />
        </span>{" "}
        22
      </p>
    </div>
  );
}
