const { Router } = require("express");
const axios = require("axios");
const { Tipo } = require("../db");
const router = Router();

async function getTipos() {
  let tiposDb = await Tipo.findAll();
  //me fijo si tengo algo
  if (!tiposDb.length) {
    let urls = [];
    let { data } = await axios.get("https://pokeapi.co/api/v2/type/");
    data.results.map((ele) => urls.push(ele.url));

    // for (let i = 0; i < urls.length; i++) {
    //   let { data } = await axios.get(urls[i]);
    //   await Tipo.findOrCreate({
    //     where: {
    //       id: data.id,
    //       name: data.name,
    //     },
    //   });
    //   // por cada iteracion
    // }
    let tiposAPI = await axios.get("https://pokeapi.co/api/v2/type");
    let Api = tiposAPI.data.results;

    Api.forEach((ele) => {
      // console.log(tiposAPI);
      let idA = parseInt(ele.url.split("/")[6]);
      console.log(ele);

      Tipo.findOrCreate({
        where: {
          id: idA,
          name: ele.name,
        },
      });
    });
    let tipos = await Tipo.findAll();
    console.log("TIPOS TRAIDOS DE API");
    return tipos;
  } else {
    console.log("TIPOS GUARDADOS EN DB");
    return tiposDb;
  }
}
module.exports = { getTipos };
