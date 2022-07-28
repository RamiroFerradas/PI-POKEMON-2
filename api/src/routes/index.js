const { Router } = require("express");
const models = require("./pokemon");
const modelsT = require("./tipo");
const { Pokemon, Tipo } = require("../db");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/pokemons", async (req, res, next) => {
  const { name } = req.query;
  try {
    res.status(200).json(await models.getConcatenado(name));
    // res.json(resultado);
  } catch (error) {
    next(error);
  }
});

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json(await models.getOnePokemonId(id));
  } catch (error) {
    res.status(400).json({ msj: "No se encuentra el id solicitado" });
  }
});

// if (!tipo || tipo.length === 0) tipo = [10001];
router.post("/pokemons", async (req, res) => {
  const { name, id, img, hp, attack, defense, weight, height, speed, type } =
    req.body;

  try {
    // name = name[0].toUpperCase() + name.slice(1);
    let createPokemon = await Pokemon.create({
      name,
      id,
      img,
      hp,
      attack,
      defense,
      weight,
      height,
      speed,
      type,
    });
    await createPokemon.addTipos(type);
    res.status(200).send(createPokemon);
    console.log(
      createPokemon.dataValues,
      `CREASTE UN POKEMON "${createPokemon.name.toUpperCase()}" CON EXITO!!`
    );
  } catch (error) {
    console.log("SE CREO EL POKEMON SIN EL TIPO");
    res.status(400).json({ msj: "ERROR" });
  }
});

router.get("/types", async (req, res) => {
  try {
    res.status(200).json(await modelsT.getTipos());
  } catch (error) {
    next(error);
  }
});

router.delete("/pokemons/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    res.status(200).json(await models.deletePokemon(id));
    console.log(`SE BORRO EL POKEMON ${id} CON EXITO !!`);
  } catch (error) {
    console.log("hola");
    next(error);
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
module.exports = router;
