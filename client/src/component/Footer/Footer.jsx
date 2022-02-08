import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

import gif2 from "./bulbasaur.gif";
import globalStyle from "../globalStyle.module.css";
import imgGithub from "./imgGit.png";
import imgFace from "./imgFace.png";
import imgInsta from "./imgInsta.png";
import imgLink from "./imgLink.png";

export default function LandingPage() {
  return (
    <div className={style.footerContainer}>
      <p className={style.by}>
        developed by @dN - 2{" "}
        <span className={style.gif2}>
          <img src={gif2} alt="" />
        </span>{" "}
        22
      </p>
      <div className={style.social}></div>
      <img className={style.img} src={imgGithub} alt="" />
      <img className={style.img} src={imgLink} alt="" />
      <img className={style.img} src={imgInsta} alt="" />
      <img className={style.img} src={imgFace} alt="" />
    </div>
  );
}
