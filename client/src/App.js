import { Routes, Route } from "react-router-dom";
import React from "react";
import { PokemonCreate } from "./components/Pokemon Create/PokemonCreate";

//Componentes
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/pokemons" element={<Home />} />
        <Route path="/pokemons/:id" />
        <Route path="/agregar" element={<PokemonCreate />} />
        <Route path="/about" />
        <Route path="*" />
      </Routes>
    </>
  );
}

export default App;
