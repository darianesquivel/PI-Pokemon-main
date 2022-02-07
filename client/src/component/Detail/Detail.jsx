import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions";
import { clearDetail } from "../../actions";
import Loading from "../Loading/Loading";
import style from "./Detail.module.css";
import globalStyle from "../globalStyle.module.css";
import imgHp from "./hp.png";
import imgAttack from "./attack.png";

export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  console.log("soy params", id);

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  const detailPokemon = useSelector((state) => state.detail);

  useEffect(() => {
    console.log("ejecuto el clear");
    dispatch(clearDetail());
  }, [dispatch]);

  return (
    <div className={style.detailContainer}>
      {detailPokemon.length < 1 ? (
        <Loading />
      ) : (
        <div className={style.detailContainer}>
          <Link to="/home">
            <button className={globalStyle.eightbitbtn}>volver</button>
          </Link>
          <h1>NAME: {detailPokemon.name}</h1>
          <img className={style.img} src={detailPokemon.image} alt="" />
          <h4>TYPES:</h4>
          {detailPokemon.types.map((p) => (
            <h4>{p}</h4>
          ))}
          <div className={style.statContainer}>
            <img className={style.icon} src={imgHp} alt="" />
            <h4>HP: {detailPokemon.hp}</h4>
          </div>
          <div className={style.statContainer}>
            <img className={style.icon} src={imgAttack} alt="" />
            <h4>ATTACK: {detailPokemon.attack}</h4>
          </div>
          <div className={style.statContainer}>
            <h4>DEFENSE: {detailPokemon.defense}</h4>
          </div>
          <div className={style.statContainer}>
            <h4>SPEED: {detailPokemon.speed}</h4>
          </div>
          <div className={style.statContainer}>
            <h4>HEIGHT: {detailPokemon.height}</h4>
          </div>
          <div>
            <h4>WEIGHT: {detailPokemon.weight}</h4>
          </div>
        </div>
      )}
    </div>
  );
}
