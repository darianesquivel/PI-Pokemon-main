import React from "react";
// import { Link, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./PokemonCreate.module.css";

function validate(input) {
  let error = {};

  if (input.name.length < 3 || input.name.length > 10) {
    error.name = "NOMBRE debe contener entre 3-10 caracteres";
  }
  if (input.hp < 1 || input.hp > 200) {
    error.hp = "HP debe ser entre 1-200 caracteres";
  }
  if (input.attack < 1 || input.attack > 500) {
    error.attack = "ATTACK debe ser entre 1-500";
  }
  if (input.defense < 1 || input.defense > 400) {
    error.defense = "DEFENSE debe ser entre 1-400";
  }
  if (input.speed < 1 || input.speed > 100) {
    error.speed = "SPEED debe ser entre 1-100";
  }
  if (input.heigth < 1 || input.heigth > 300) {
    error.heigth = "HEIGTH debe ser entre 1-300";
  }
  if (input.weight < 1 || input.weight > 300) {
    error.weight = "WEIGTH debe ser entre 1-300";
  }
  return error;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const types = useSelector((state) => state.allTypes);
  const [error, setError] = useState({
    name: "NOMBRE debe contener entre 3-10 caracteres",
    hp: "HP debe ser entre 1-200",
    attack: "ATTACK debe ser entre 1-500",
    defense: "DEFENSE debe ser entre 1-400",
    speed: "SPEED debe ser entre 1-100",
    heigth: "HEIGTH debe ser entre 1-300",
    weight: "WEIGTH debe ser entre 1-300",
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
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
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
    dispatch(getTypes());
  }, [dispatch]);

  console.log(input.types);

  return (
    <div className={style.createContainer}>
      <Link to="/home">
        <button className={style.buttonCreate}>volver</button>
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
                className={style.inputCreateLarge}
                onChange={(e) => handleChange(e)}
                value={input.name}
                type="text"
                name="name"
              />
            </div>
            <div className={style.data}>
              <label> Types </label>
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
            </div>
            <div className={style.subContainer}>
              <div className={style.data}>
                <label> Hp </label>
                <div className={style.inputError}>
                  <input
                    className={style.inputCreate}
                    onChange={(e) => handleChange(e)}
                    value={input.hp}
                    type="number"
                    name="hp"
                  />
                </div>
              </div>
              <div className={style.data}>
                <label> Attack </label>
                <div className={style.inputError}>
                  <input
                    className={style.inputCreate}
                    onChange={(e) => handleChange(e)}
                    value={input.attack}
                    type="number"
                    name="attack"
                  />
                </div>
              </div>

              <div className={style.data}>
                <label> Defense </label>
                <div className={style.inputError}>
                  <input
                    className={style.inputCreate}
                    onChange={(e) => handleChange(e)}
                    value={input.defense}
                    type="number"
                    name="defense"
                  />
                </div>
              </div>
            </div>

            <div className={style.subContainer}>
              <div className={style.data}>
                <label> Speed </label>
                <div className={style.inputError}>
                  <input
                    className={style.inputCreate}
                    onChange={(e) => handleChange(e)}
                    value={input.speed}
                    type="number"
                    name="speed"
                  />
                </div>
              </div>

              <div className={style.data}>
                <label> Heigth </label>
                <div className={style.inputError}>
                  <input
                    className={style.inputCreate}
                    onChange={(e) => handleChange(e)}
                    value={input.heigth}
                    type="number"
                    name="heigth"
                  />
                </div>
              </div>
              <div className={style.data}>
                <label> Weight </label>
                <div className={style.inputError}>
                  <input
                    className={style.inputCreate}
                    onChange={(e) => handleChange(e)}
                    value={input.weight}
                    type="number"
                    name="weight"
                  />
                </div>
              </div>
            </div>

            <div className={style.data}>
              <label> Image </label>
              <input
                className={style.inputCreateLarge}
                onChange={(e) => handleChange(e)}
                value={input.image}
                type="text"
                name="image"
              />
            </div>

            {!error.name &&
            !error.hp &&
            !error.attack &&
            !error.defense &&
            !error.speed &&
            !error.heigth &&
            !error.weight ? (
              <button className={style.buttonCreate} type="submit">
                Crear personaje
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className={style.errorContainer}>
          {error.name && <p className={style.error}>{error.name}</p>}
          {error.hp && <p className={style.warning}>{error.hp}</p>}
          {error.attack && <p className={style.warning}>{error.attack}</p>}
          {error.defense && <p className={style.warning}>{error.defense}</p>}
          {error.speed && <p className={style.warning}>{error.speed}</p>}
          {error.heigth && <p className={style.warning}>{error.heigth}</p>}
          {error.weight && <p className={style.warning}>{error.weight}</p>}

          {!error.name ? (
            <h3 className={style.success}>YA PUEDES CREAR EL PERSONAJE</h3>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
