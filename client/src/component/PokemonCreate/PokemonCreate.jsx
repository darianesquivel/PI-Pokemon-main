import React from "react";
// import { Link, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { postPokemon, getTypes, getPokemons } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
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
  heigth: {
    min: 1,
    max: 300,
  },
  weight: {
    min: 1,
    max: 1500,
  },
};

const placeholder = {
  hp: `${stats.hp.min}-${stats.hp.max} `,
  attack: `${stats.attack.min}-${stats.attack.max} `,
  defense: `${stats.defense.min}-${stats.defense.max} `,
  speed: `${stats.speed.min}-${stats.speed.max} `,
  heigth: `${stats.heigth.min}-${stats.heigth.max} `,
  weight: `${stats.weight.min}-${stats.weight.max} `,
  image: `https://web/img.jpg`,
};

//*******************
//**     STATS     **
//*******************

let regularUrl = /^(ftp|http|https):\/\/[^ "]+$/;

function validate(input) {
  let error = {};

  if (input.name.length < 3 || input.name.length > 10) {
    error.name = `NOMBRE debe contener entre 3-10 caracteres`;
  }
  // if (input.types.length < 0) {
  //   error.types = "TYPES debe tener al menos 1";
  // }

  if (input.hp < stats.hp.min || input.hp > stats.hp.max) {
    error.hp = `HP debe ser entre ${stats.hp.min} - ${stats.hp.max} caracteres`;
  }

  if (input.attack < stats.attack.min || input.attack > stats.attack.max) {
    error.attack = `ATTACK debe ser entre ${stats.attack.min} - ${stats.attack.max}`;
  }
  if (input.defense < stats.defense.min || input.defense > stats.defense.max) {
    error.defense = `DEFENSE debe ser entre ${stats.defense.min} - ${stats.defense.max}`;
  }
  if (input.speed < stats.speed.min || input.speed > stats.speed.max) {
    error.speed = `SPEED debe ser entre ${stats.speed.min} - ${stats.speed.max}`;
  }
  if (input.heigth < stats.heigth.min || input.heigth > stats.heigth.max) {
    error.heigth = `HEIGTH debe ser entre ${stats.heigth.min} - ${stats.heigth.max}`;
  }
  if (input.weight < stats.weight.min || input.weight > stats.weight.max) {
    error.weight = `WEIGTH debe ser entre ${stats.weight.min} - ${stats.weight.max}`;
  }
  if (input.image.length > 0 && !regularUrl.test(input.image)) {
    error.image = "IMAGE debe ser una URL";
  }
  return error;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const types = useSelector((state) => state.allTypes);
  const allPokemons = useSelector((state) => state.pokemons);
  const [error, setError] = useState({
    name: "NOMBRE debe contener entre 3-10 caracteres",
    //types: "TYPES debe tener al menos 1",
    hp: `HP debe ser entre ${stats.hp.min} - ${stats.hp.max} caracteres`,
    attack: `ATTACK debe ser entre ${stats.attack.min} - ${stats.attack.max}`,
    defense: `DEFENSE debe ser entre ${stats.defense.min} - ${stats.defense.max}`,
    speed: `SPEED debe ser entre ${stats.speed.min} - ${stats.speed.max}`,
    heigth: `HEIGTH debe ser entre ${stats.heigth.min} - ${stats.heigth.max}`,
    weight: `WEIGTH debe ser entre ${stats.weight.min} - ${stats.weight.max}`,
    image: "",
  });
  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    heigth: "",
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
    if (input.types.indexOf(e.target.value) === -1) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
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
        heigth: "",
        weight: "",
        image: "",
      });

      setError({
        name: "NOMBRE debe contener entre 3-10 caracteres",
        //types: "TYPES debe tener al menos 1",
        hp: `HP debe ser entre ${stats.hp.min} - ${stats.hp.max} caracteres`,
        attack: `ATTACK debe ser entre ${stats.attack.min} - ${stats.attack.max}`,
        defense: `DEFENSE debe ser entre ${stats.defense.min} - ${stats.defense.max}`,
        speed: `SPEED debe ser entre ${stats.speed.min} - ${stats.speed.max}`,
        heigth: `HEIGTH debe ser entre ${stats.heigth.min} - ${stats.heigth.max}`,
        weight: `WEIGTH debe ser entre ${stats.weight.min} - ${stats.weight.max}`,
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
        heigth: input.heigth,
        weight: input.weight,
        image: input.image,
      });

      setError({
        name: "NOMBRE EXISTENTE",
        // types: error.types,
        hp: error.hp,
        attack: error.attack,
        defense: error.defense,
        speed: error.speed,
        heigth: error.heigth,
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
      return "Pokemon existente";
    }
  }

  return (
    <div className={style.createContainer}>
      <Link to="/home">
        <button className={globalStyle.eightbitbtn}>volver</button>
      </Link>
      <h1>CREA TU POKEMON</h1>
      <div className={style.formErrorContainer}>
        <div className={style.formContainer}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={style.form}
            action=""
          >
            <div className={style.data}>
              <label> Nombre </label>

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
              <div className={style.typeContainer}>
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
                <label> Heigth </label>
                <div>
                  <input
                    className={
                      !error.heigth ? style.inputCreate : style.inputCreateError
                    }
                    onChange={(e) => handleChange(e)}
                    value={input.heigth}
                    type="number"
                    name="heigth"
                    placeholder={placeholder.heigth}
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
            !error.hp &&
            !error.attack &&
            !error.defense &&
            !error.speed &&
            !error.heigth &&
            !error.weight &&
            !error.image ? (
              <button className={globalStyle.eightbitbtn} type="submit">
                Crear personaje
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className={style.errorContainer}>
          {error.name && <p className={style.error}>{error.name}</p>}
          {error.hp && <p className={style.error}>{error.hp}</p>}
          {error.attack && <p className={style.error}>{error.attack}</p>}
          {error.defense && <p className={style.error}>{error.defense}</p>}
          {error.speed && <p className={style.error}>{error.speed}</p>}
          {error.heigth && <p className={style.error}>{error.heigth}</p>}
          {error.weight && <p className={style.error}>{error.weight}</p>}
          {error.image && <p className={style.error}>{error.image}</p>}

          {!error.name &&
          !error.hp &&
          !error.attack &&
          !error.defense &&
          !error.speed &&
          !error.heigth &&
          !error.weight &&
          !error.image ? (
            <h3 className={style.success}>YA PUEDES CREAR EL PERSONAJE</h3>
          ) : (
            <h2 className={style.error}>HAY DATOS CON ERRORES</h2>
          )}
        </div>
      </div>
    </div>
  );
}
