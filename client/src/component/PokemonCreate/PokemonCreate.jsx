import React from "react";
// import { Link, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { postPokemon, getTypes, getPokemons } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import style from "./PokemonCreate.module.css";
import globalStyle from "../globalStyle.module.css";

//*******************
//**     STATS     **
//*******************

const stats = {
  hp: {
    min: 1,
    max: 500,
  },
  attack: {
    min: 1,
    max: 500,
  },
  defense: {
    min: 1,
    max: 400,
  },
  speed: {
    min: 1,
    max: 100,
  },
  height: {
    min: 1,
    max: 300,
  },
  weight: {
    min: 1,
    max: 1500,
  },
};

//**************************
//**     PLACEHOLDERS     **
//**************************

const placeholder = {
  hp: `${stats.hp.min}-${stats.hp.max} `,
  attack: `${stats.attack.min}-${stats.attack.max} `,
  defense: `${stats.defense.min}-${stats.defense.max} `,
  speed: `${stats.speed.min}-${stats.speed.max} `,
  height: `${stats.height.min}-${stats.height.max} `,
  weight: `${stats.weight.min}-${stats.weight.max} `,
  image: `https://web/img.jpg`,
};

//******************************************
//**          REGULAR EXPRESSION          **
//******************************************

let regularUrl = /^(ftp|http|https):\/\/[^ "]+$/;
let regularName = /^[a-z]+$/i;
let regularNum = /^([0-9])*$/;

//***************************************
//**          VALIDATION FORM          **
//***************************************

function validate(input) {
  let error = {};

  if (
    !regularName.test(input.name) ||
    input.name.length < 3 ||
    input.name.length > 10
  ) {
    error.name = `NAME is required and must contain between 3 and 10 characters`;
  }
  if (input.types.length < 0 || input.types.length > 2) {
    error.types = "TYPES is required max 2 types";
  }
  if (
    !regularNum.test(input.hp) ||
    input.hp < stats.hp.min ||
    input.hp > stats.hp.max
  ) {
    error.hp = `HP is required and must be a number between ${stats.hp.min} - ${stats.hp.max}`;
  }
  if (
    !regularNum.test(input.attack) ||
    input.attack < stats.attack.min ||
    input.attack > stats.attack.max
  ) {
    error.attack = `ATTACK is required and must be a number between ${stats.attack.min} - ${stats.attack.max}`;
  }
  if (
    !regularNum.test(input.defense) ||
    input.defense < stats.defense.min ||
    input.defense > stats.defense.max
  ) {
    error.defense = `DEFENSE is required and must be a number between ${stats.defense.min} - ${stats.defense.max}`;
  }
  if (
    !regularNum.test(input.speed) ||
    input.speed < stats.speed.min ||
    input.speed > stats.speed.max
  ) {
    error.speed = `SPEED is required and must be a number between ${stats.speed.min} - ${stats.speed.max}`;
  }
  if (
    !regularNum.test(input.height) ||
    input.height < stats.height.min ||
    input.height > stats.height.max
  ) {
    error.height = `HEIGHT is required and must be a number between ${stats.height.min} - ${stats.height.max}`;
  }
  if (
    !regularNum.test(input.weight) ||
    input.weight < stats.weight.min ||
    input.weight > stats.weight.max
  ) {
    error.weight = `WEIGTH is required and must be a number between ${stats.weight.min} - ${stats.weight.max}`;
  }
  if (input.image.length > 0 && !regularUrl.test(input.image)) {
    error.image = "IMAGE must be a valid URL";
  }
  return error;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.allTypes);
  const allPokemons = useSelector((state) => state.pokemons);
  const [error, setError] = useState({
    name: "NAME is required and must contain between 3 and 10 characters",
    types: "TYPES is required max 2 types",
    hp: `HP is required and must be a number between ${stats.hp.min} - ${stats.hp.max}`,
    attack: `ATTACK is required and must be a number between ${stats.attack.min} - ${stats.attack.max}`,
    defense: `DEFENSE is required and must be a number between ${stats.defense.min} - ${stats.defense.max}`,
    speed: `SPEED is required and must be a number between ${stats.speed.min} - ${stats.speed.max}`,
    height: `HEIGHT is required and must be a number between ${stats.height.min} - ${stats.height.max}`,
    weight: `WEIGTH is required and must be a number between ${stats.weight.min} - ${stats.weight.max}`,
    image: "",
  });
  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (input.types.indexOf(e.target.value) === -1 && input.types.length < 2) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const repeatPokemon = checkRepeat(input.name);

    if (repeatPokemon !== "Pokemon existente") {
      dispatch(postPokemon(input));
      alert("Pokemon creado");

      setInput({
        name: "",
        types: [],
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
      });

      setError({
        name: "NAME is required and must contain between 3 and 10 characters",
        types: "TYPES is required max 2 types",
        hp: `HP is required and must be a number between ${stats.hp.min} - ${stats.hp.max}`,
        attack: `ATTACK is required and must be a number between ${stats.attack.min} - ${stats.attack.max}`,
        defense: `DEFENSE is required and must be a number betwee ${stats.defense.min} - ${stats.defense.max}`,
        speed: `SPEED is required and must be a number between ${stats.speed.min} - ${stats.speed.max}`,
        height: `HEIGHT is required and must be a number between ${stats.height.min} - ${stats.height.max}`,
        weight: `WEIGTH is required and must be a number between ${stats.weight.min} - ${stats.weight.max}`,
        image: "",
      });
    } else {
      alert(repeatPokemon);

      setInput({
        name: "",
        types: input.types,
        hp: input.hp,
        attack: input.attack,
        defense: input.defense,
        speed: input.speed,
        height: input.height,
        weight: input.weight,
        image: input.image,
      });

      setError({
        name: "NAME already exist",
        types: error.types,
        hp: error.hp,
        attack: error.attack,
        defense: error.defense,
        speed: error.speed,
        height: error.height,
        weight: error.weight,
        image: error.image,
      });
    }

    //history.push("/home");
  }

  function handleDelete(ty, e) {
    e.preventDefault();
    setInput({
      ...input,
      types: input.types.filter((t) => t !== ty),
    });

    if (input.types.length === 1) {
      setError(
        validate({
          ...input,
          types: "TYPES is required max 2 types",
        })
      );
    }
  }

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function checkRepeat(name) {
    const repeat = allPokemons.filter(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );

    if (repeat.length > 0) {
      return "Pokemon already exist";
    }
  }

  return (
    <div className={style.createContainer}>
      <Link to="/home">
        <button className={globalStyle.eightbitbtn}>BACK</button>
      </Link>
      <h1>CREATE YOUR POKEMON</h1>
      <div className={style.formErrorContainer}>
        <div className={style.formContainer}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={style.form}
            action=""
          >
            <div className={style.data}>
              <label> Name </label>

              <input
                className={
                  !error.name
                    ? style.inputCreateLarge
                    : style.inputCreateLargeError
                }
                onChange={(e) => handleChange(e)}
                value={input.name}
                type="text"
                name="name"
              />
            </div>
            <div className={style.data}>
              <label> Types </label>
              <select
                onChange={(e) => handleSelect(e)}
                className={style.select}
              >
                {types.map((t, index) => (
                  <option
                    key={index}
                    value={t.name}
                    className={style.optionSelect}
                  >
                    {t.name}
                  </option>
                ))}
              </select>
              <div
                className={
                  !error.types ? style.typeContainer : style.typeContainerError
                }
              >
                {input.types.map((ty, index) => (
                  <div key={index} className={style.types}>
                    <p className={style.typeName}>{ty}</p>
                    <button
                      className={style.buttonDelete}
                      onClick={(e) => handleDelete(ty, e)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.subContainer}>
              <div className={style.data}>
                <label> Hp </label>
                <div className={style.inputError}>
                  <input
                    className={
                      !error.hp ? style.inputCreate : style.inputCreateError
                    }
                    onChange={(e) => handleChange(e)}
                    value={input.hp}
                    type="number"
                    name="hp"
                    placeholder={placeholder.hp}
                  />
                </div>
              </div>
              <div className={style.data}>
                <label> Attack </label>
                <div className={style.inputError}>
                  <input
                    className={
                      !error.attack ? style.inputCreate : style.inputCreateError
                    }
                    onChange={(e) => handleChange(e)}
                    value={input.attack}
                    type="number"
                    name="attack"
                    placeholder={placeholder.attack}
                  />
                </div>
              </div>

              <div className={style.data}>
                <label> Defense </label>
                <div className={style.inputError}>
                  <input
                    className={
                      !error.defense
                        ? style.inputCreate
                        : style.inputCreateError
                    }
                    onChange={(e) => handleChange(e)}
                    value={input.defense}
                    type="number"
                    name="defense"
                    placeholder={placeholder.defense}
                  />
                </div>
              </div>
            </div>

            <div className={style.subContainer}>
              <div className={style.data}>
                <label> Speed </label>
                <div className={style.inputError}>
                  <input
                    className={
                      !error.speed ? style.inputCreate : style.inputCreateError
                    }
                    onChange={(e) => handleChange(e)}
                    value={input.speed}
                    type="number"
                    name="speed"
                    placeholder={placeholder.speed}
                  />
                </div>
              </div>

              <div className={style.data}>
                <label> Height </label>
                <div>
                  <input
                    className={
                      !error.height ? style.inputCreate : style.inputCreateError
                    }
                    onChange={(e) => handleChange(e)}
                    value={input.height}
                    type="number"
                    name="height"
                    placeholder={placeholder.height}
                  />
                </div>
              </div>
              <div className={style.data}>
                <label> Weight </label>
                <div className={style.inputError}>
                  <input
                    className={
                      !error.weight ? style.inputCreate : style.inputCreateError
                    }
                    onChange={(e) => handleChange(e)}
                    value={input.weight}
                    type="number"
                    name="weight"
                    placeholder={placeholder.weight}
                  />
                </div>
              </div>
            </div>

            <div className={style.data}>
              <label> Image </label>
              <input
                className={
                  !error.image
                    ? style.inputCreateLarge
                    : style.inputCreateLargeError
                }
                onChange={(e) => handleChange(e)}
                value={input.image}
                type="text"
                name="image"
                placeholder={placeholder.image}
              />
            </div>

            {!error.name &&
            !error.types &&
            !error.hp &&
            !error.attack &&
            !error.defense &&
            !error.speed &&
            !error.height &&
            !error.weight &&
            !error.image ? (
              <button className={globalStyle.eightbitbtn} type="submit">
                Create pokemon
              </button>
            ) : (
              <button
                className={globalStyle.eightbitbtn2}
                type="submit"
                disabled
              >
                Create pokemon
              </button>
            )}
          </form>
        </div>
        <div className={style.errorContainer}>
          {error.name && <p className={style.error}>{error.name}</p>}
          {error.types && <p className={style.error}>{error.types}</p>}
          {error.hp && <p className={style.error}>{error.hp}</p>}
          {error.attack && <p className={style.error}>{error.attack}</p>}
          {error.defense && <p className={style.error}>{error.defense}</p>}
          {error.speed && <p className={style.error}>{error.speed}</p>}
          {error.height && <p className={style.error}>{error.height}</p>}
          {error.weight && <p className={style.error}>{error.weight}</p>}
          {error.image && <p className={style.error}>{error.image}</p>}

          {!error.name &&
          !error.types &&
          !error.hp &&
          !error.attack &&
          !error.defense &&
          !error.speed &&
          !error.height &&
          !error.weight &&
          !error.image ? (
            <h3 className={style.success}>YOU CAN CREATE THE CHARACTER</h3>
          ) : (
            <h2 className={style.error}>DATA ERROR</h2>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
