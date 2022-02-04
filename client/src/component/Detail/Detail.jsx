import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions";
import { clearDetail } from "../../actions";
import Loading from "../Loading/Loading";
import style from "./Detail.module.css";

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
        <div>
          <h1>NAME: {detailPokemon.name}</h1>
          <img src={detailPokemon.image} alt="" />
          <h4>TYPES:</h4>
          {detailPokemon.types.map((p) => (
            <h4>{p}</h4>
          ))}
          <h4>HP: {detailPokemon.hp}</h4>
          <h4>ATTACK: {detailPokemon.attack}</h4>
          <h4>DEFENSE: {detailPokemon.defense}</h4>
          <h4>SPEED: {detailPokemon.speed}</h4>
          <h4>HEIGHT: {detailPokemon.height}</h4>
          <h4>WEIGHT: {detailPokemon.weight}</h4>
        </div>
      )}
      <Link to="/home">
        <button className={style.buttonDetail}>volver</button>
      </Link>
    </div>
  );
}
