import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions";
import { clearDetail } from "../../actions";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";
import style from "./Detail.module.css";
import globalStyle from "../globalStyle.module.css";
import defaultImg from "./pokemonUnknow.svg";
import imgHp from "./hp.svg";
import imgAttack from "./attack.svg";
import imgDefense from "./def.svg";
import imgHeight from "./height.svg";
import imgWeight from "./weight.svg";
import imgSpeed from "./speed.svg";
// import { deletePokemon } from "../../actions";

export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const detailPokemon = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(clearDetail());
  }, [dispatch]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   const sure = window.confirm(
  //     "Are you sure you want to delete your pokemon?"
  //   );
  //   if (sure) {
  //     dispatch(deletePokemon(id));
  //   }
  // }

  console.log("detailpokemon", detailPokemon);
  return (
    <div className={style.detailContainer}>
      {detailPokemon.length < 1 ? (
        <Loading />
      ) : (
        <div className={style.detailContainer}>
          <div className={style.subContainers}>
            <div className={style.imgNameTypeContainer}>
              <img
                className={style.img}
                src={detailPokemon.image ? detailPokemon.image : defaultImg}
                alt=""
              />
              <h1>{detailPokemon.name}</h1>
              <h4 className={style.tittle}>TYPES</h4>
              <div className={style.typContainer}>
                {detailPokemon.types.map((p, index) => (
                  <h4 key={index} className={style.type}>
                    {p}
                  </h4>
                ))}
              </div>
            </div>
            <div className={style.statsContainer}>
              <div className={style.statContainer}>
                <img className={style.icon} src={imgHp} alt="" />
                <h3>HP</h3>
                <h4>{detailPokemon.hp}</h4>
              </div>
              <div className={style.statContainer}>
                <img className={style.icon} src={imgAttack} alt="" />
                <h3>ATTACK</h3>
                <h4>{detailPokemon.attack}</h4>
              </div>
              <div className={style.statContainer}>
                <img className={style.icon} src={imgDefense} alt="" />
                <h3>DEFENSE</h3>
                <h4>{detailPokemon.defense}</h4>
              </div>
              <div className={style.statContainer}>
                <img className={style.icon} src={imgSpeed} alt="" />
                <h3>SPEED</h3>
                <h4>{detailPokemon.speed}</h4>
              </div>
              <div className={style.statContainer}>
                <img className={style.icon} src={imgHeight} alt="" />
                <h3>HEIGHT</h3>
                <h4>{detailPokemon.height}</h4>
              </div>
              <div className={style.statContainer}>
                <img className={style.icon} src={imgWeight} alt="" />
                <h3>WEIGHT</h3>
                <h4>{detailPokemon.weight}</h4>
              </div>
            </div>
          </div>
          <Link to="/home">
            <button className={globalStyle.eightbitbtn}>volver</button>
          </Link>
          {/* <button type="submit" onClick={(e) => handleClick(e)}>
            DELETE
          </button> */}
        </div>
      )}

      <Footer />
    </div>
  );
}
