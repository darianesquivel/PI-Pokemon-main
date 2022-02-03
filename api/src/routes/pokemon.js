const { Router } = require("express");
const {
  getAllPokemons,
  getPokemonByIdApi,
  getPokemonByIdDb,
  getPokemonByNameApi,
  getPokemonByNameDb,
} = require("./function");
const { Pokemon, Type } = require("../db");
const router = Router();

//*****************************************
//**          GET POKEMOS / NAME         **
//*****************************************

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;

    if (name) {
      let pokemonApi = await getPokemonByNameApi(name);
      if (pokemonApi !== "undefined" && pokemonApi !== "Pokemon no encontrado")
        return res.send(pokemonApi);

      let pokemonDb = await getPokemonByNameDb(name);
      if (pokemonDb !== "undefined") return res.send(pokemonDb);

      return res.send("Pokemon no encontrado");
    } else {
      let allPokemons = await getAllPokemons();
      res.status(200).send(allPokemons);
    }
  } catch (error) {
    res.status(404).send("Error");
  }
});

//*************************************
//**          GET POKEMOS ID         **
//*************************************

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length < 5) {
      let searchIdApi = await getPokemonByIdApi(id);
      res.status(200).send(searchIdApi);
    } else {
      let searchIdDb = await getPokemonByIdDb(id);
      res.status(200).send(searchIdDb);
    }
  } catch (error) {
    res.status(404).send("Error");
  }
});

//***********************************
//**          POST POKEMON         **
//***********************************

router.post("/", async (req, res, next) => {
  try {
    let {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      image,
      createInDb,
    } = req.body;

    let allPokemons = await getAllPokemons();

    let namePokemon = allPokemons.filter(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    );

    if (namePokemon.length) {
      res.status(400).send("Ya existe un Pokemon con ese nombre");
    } else {
      const newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createInDb,
      });

      types.map(async (t) => {
        const newType = await Type.findOrCreate({
          where: {
            name: t,
          },
        });
        newPokemon.addType(newType[0]);
      });

      res.status(200).send("Pokemon agregado con exito");
    }
  } catch (error) {
    res.status(404).send("No se pudo agregar pokemon");
  }
});

module.exports = router;
