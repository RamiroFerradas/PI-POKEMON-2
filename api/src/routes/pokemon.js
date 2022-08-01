// const { Router } = require("express");
// const axios = require("axios");
// const { Pokemon, Tipo } = require("../db");
// const e = require("express");
// const router = Router();
// // const { Op } = require("sequelize");

// function crearPokemon(d) {
//   return {
//     name: d.name[0].toUpperCase() + d.name.slice(1),
//     id: d.id,
//     // img: d.sprites.other.dream_world.front_default,
//     img: d.sprites.other.home.front_default,
//     hp: d.stats[0].base_stat,
//     attack: d.stats[1].base_stat,
//     defense: d.stats[2].base_stat,
//     weight: d.weight,
//     height: d.height,
//     speed: d.stats[5].base_stat,
//     type: d.types.map((el) => el.type.name), //porque es un array de objetos "types"
//     // console.log("uso el modelo crearPokemon() del back");
//   };
// }

// async function getPokemonDB() {
//   const pokemonDB = await Pokemon.findAll({
//     include: {
//       model: Tipo,
//       attributes: ["name"],
//     },
//   });
//   const mapeados = pokemonDB.map((p) => {
//     return p.dataValues;
//   });
//   console.log("LISTADO POKEMONS DB");
//   // console.log("hola", mapeados);
//   return mapeados;
// }

// async function getPokemon() {
//   const { data } = await axios.get(
//     "https://pokeapi.co/api/v2/pokemon/?limit=40"
//   );
//   // const resultados = data.results;
//   //accedo a la url donde tengo todo el detalle de cada poke:
//   const promesa = await Promise.all(
//     data.results.map((ele) => axios.get(ele.url))
//   );
//   // console.log(promesa);
//   //limpio la info que me trae axios y obtengo solo la data:
//   const infoLimpia = promesa.map((ele) => ele.data);
//   const arrayResultado = [];
//   //info limpioa de cada uno me lo guardo en mi array:
//   infoLimpia.forEach((ele) => arrayResultado.push(crearPokemon(ele)));

//   console.log("INFO DE TODOS LOS POKEMONS ");
//   return arrayResultado;
// }
// getPokemon();

// async function getOnePokemonId(id) {
//   if (id.includes("-")) {
//     //traigo poke creado desde la base de datos
//     let data = await Pokemon.findByPk(id, {
//       include: {
//         model: Tipo,
//         attributes: ["name"],
//       },
//     });
//     console.log("ID DE POKEMON CREADO");

//     return data;
//   } else {
//     //traigo pokemon desde la api
//     const { data } = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${id}/`
//     );
//     console.log("ID DE POKEMON EN API");

//     return crearPokemon(data);
//   }
// }

// async function getConcatenado(name) {
//   const getDb = await getPokemonDB();
//   const getApi = await getPokemon();

//   const mapeo = getDb.map((ele) => {
//     return {
//       name: ele.name,
//       id: ele.id,
//       img: ele.img,
//       hp: ele.hp,
//       attack: ele.attack,
//       defense: ele.defense,
//       weight: ele.weight,
//       height: ele.height,
//       speed: ele.speed,
//       createdInDb: ele.createdInDb,
//       type: ele.tipos.map((ele) => ele.name),
//     };
//   });
//   console.log(mapeo);
//   const getFinal = getApi.concat(mapeo);
//   if (name) {
//     let buscar = getFinal.filter(
//       (ele) => ele.name.toLowerCase() === name.toLowerCase()
//     );
//     if (buscar.length > 0) {
//       return buscar;
//     }
//     return alert("No se encontro el pokemon");
//   } else {
//     return getFinal;
//   }
// }

// async function deletePokemon(id) {
//   let prueba = await Pokemon.destroy({
//     where: {
//       id: id,
//     },
//   });
//   return prueba;
// }

// module.exports = {
//   crearPokemon,
//   getPokemonDB,
//   getPokemon,
//   getOnePokemonId,
//   getConcatenado,
//   deletePokemon,
// };

const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const e = require("express");
const router = Router();
// const { Op } = require("sequelize");

function crearPokemon(d) {
  return {
    name: d.name[0].toUpperCase() + d.name.slice(1),
    id: d.id,
    // img: d.sprites.other.dream_world.front_default,
    img: d.sprites.other.home.front_default,
    hp: d.stats[0].base_stat,
    attack: d.stats[1].base_stat,
    defense: d.stats[2].base_stat,
    weight: d.weight,
    height: d.height,
    speed: d.stats[5].base_stat,
    type: d.types.map((el) => el.type.name), //porque es un array de objetos "types"
    // console.log("uso el modelo crearPokemon() del back");
  };
}

async function getPokemonDB() {
  const pokemonDB = await Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ["name"],
    },
  });
  const mapeados = pokemonDB.map((p) => {
    return p.dataValues;
  });
  console.log("LISTADO POKEMONS DB");
  // console.log("hola", mapeados);
  return mapeados;
}

async function getPokemon() {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=40"
  );
  const resultados = data.results;
  //accedo a la url donde tengo todo el detalle de cada poke:
  const promesa = await Promise.all(
    resultados.map((ele) => axios.get(ele.url))
  );
  //limpio la info que me trae axios y obtengo solo la data:
  const infoLimpia = promesa.map((ele) => ele.data);
  const arrayResultado = [];
  //info limpioa de cada uno me lo guardo en mi array:
  infoLimpia.forEach((ele) => arrayResultado.push(crearPokemon(ele)));

  console.log("INFO DE TODOS LOS POKEMONS ");
  return arrayResultado;
}

async function getOnePokemonId(id) {
  if (id.includes("-")) {
    //traigo poke creado desde la base de datos
    let data = await Pokemon.findByPk(id, {
      include: {
        model: Tipo,
        attributes: ["name"],
      },
    });
    console.log("ID DE POKEMON CREADO");

    return data;
  } else {
    //traigo pokemon desde la api
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );
    console.log("ID DE POKEMON EN API");

    return crearPokemon(data);
  }
}

async function getConcatenado(name) {
  const getDb = await getPokemonDB();
  const getApi = await getPokemon();
  const mapeo = getDb.map((ele) => {
    return {
      name: ele.name,
      id: ele.id,
      img: ele.img,
      hp: ele.hp,
      attack: ele.attack,
      defense: ele.defense,
      weight: ele.weight,
      height: ele.height,
      speed: ele.speed,
      createdInDb: ele.createdInDb,
      type: ele.tipos.map((ele) => ele.name),
    };
  });
  console.log(mapeo);
  const getFinal = getApi.concat(mapeo);
  if (name) {
    let buscar = getFinal.filter(
      (ele) => ele.name.toLowerCase() === name.toLowerCase()
    );
    if (buscar.length > 0) {
      return buscar;
    }
    return alert("No se encontro el pokemon");
  } else {
    return getFinal;
  }
}

async function deletePokemon(id) {
  let prueba = await Pokemon.destroy({
    where: {
      id: id,
    },
  });
  return prueba;
}

module.exports = {
  crearPokemon,
  getPokemonDB,
  getPokemon,
  getOnePokemonId,
  getConcatenado,
  deletePokemon,
};
