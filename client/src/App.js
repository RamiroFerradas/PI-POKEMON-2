import { Routes, Route } from "react-router-dom";
import React from "react";

//Componentes
import { PokemonCreate } from "./components/Pokemon Create/PokemonCreate";
import PokemonDetail from "./components/Pokememon Detail/PokemonDetail";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemons/:id" element={<PokemonDetail />} />
        <Route path="/agregar" element={<PokemonCreate />} />
        <Route path="/about" />
        <Route path="*" />
      </Routes>
    </>
  );
}

export default App;
