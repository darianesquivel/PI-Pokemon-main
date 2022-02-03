import React from "react";
import gif from "./loading.gif";
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={style.loadingContainer}>
      <img src={gif} alt="img not found" width="200px" height="250px" />
      <h3>Loading...</h3>
    </div>
  );
}
