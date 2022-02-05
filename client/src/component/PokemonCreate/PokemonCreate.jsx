import React from "react";
// import { Link, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./PokemonCreate.module.css";

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Se requiere nombre";
  }
  return error;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const types = useSelector((state) => state.allTypes);
  const [error, setError] = useState({});

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

  console.log(input.types);
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
    console.log("soy el evento que submitea", e);
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

  return (
    <div className={style.createContainer}>
      <Link to="/home">
        <button className={style.buttonCreate}>volver</button>
      </Link>
      <h1>CREA TU POKEMON</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form} action="">
        <div>
          <label> Nombre: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.name}
            type="text"
            name="name"
          />
          {error.name && <p className={style.error}>{error.name}</p>}
        </div>
        <div>
          <label> Types: </label>

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

          <select onChange={(e) => handleSelect(e)} className={style.select}>
            {types.map((t, index) => (
              <option key={index} value={t.name} className={style.optionSelect}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label> Hp: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.hp}
            type="number"
            name="hp"
          />
        </div>
        <div>
          <label> Attack: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.attack}
            type="number"
            name="attack"
          />
        </div>
        <div>
          <label> Defense: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.defense}
            type="number"
            name="defense"
          />
        </div>
        <div>
          <label> Speed: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.speed}
            type="number"
            name="speed"
          />
        </div>
        <div>
          <label> Heigth: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.heigth}
            type="number"
            name="heigth"
          />
        </div>
        <div>
          <label> Weight: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.weight}
            type="number"
            name="weight"
          />
        </div>
        <div>
          <label> Image: </label>
          <input
            className={style.inputCreate}
            onChange={(e) => handleChange(e)}
            value={input.image}
            type="text"
            name="image"
          />
        </div>

        <button className={style.buttonCreate} type="submit">
          Crear personaje
        </button>
      </form>
    </div>
  );
}
