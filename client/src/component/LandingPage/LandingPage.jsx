import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import gif from "./pikachu.gif";
import gif2 from "./fondopokemons.gif";
import globalStyle from "../globalStyle.module.css";
import Footer from "../Footer/Footer";

const cta = "< ingresar >";

export default function LandingPage() {
  return (
    <div className={style.LangindContainer}>
      <h1> 8-BIT POKEMON API </h1>
      <Link to="/home" className={style.btnLink}>
        <div className={style.btnCtaContainer}>
          <img src={gif} alt="" />
          <button className={globalStyle.eightbitbtn}> {cta} </button>
        </div>
      </Link>
      <img className={style.imgBackground} src={gif2} alt="" />
      <Footer />
    </div>
  );
}
