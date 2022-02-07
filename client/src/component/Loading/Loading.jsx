import React from "react";
import gif from "./loading.gif";
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={style.loadingContainer}>
      <img src={gif} alt="img not found" width="200px" height="250px" />

      <div className={style.container}>
        <p>Loading</p>
        <div className={style.boxloading}>
          <div className={style.smboxloading}></div>
        </div>
      </div>
    </div>
  );
}
