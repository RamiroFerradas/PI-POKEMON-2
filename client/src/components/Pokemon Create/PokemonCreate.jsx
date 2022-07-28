import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTypes, postPokemon } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import getPokemons from "../../actions";
import { useNavigate } from "react-router-dom";
// import PokemonCreate from "../Pokemon Create/PokemonCreate.css";
import "./PokemonCreate.css";

export function PokemonCreate() {
  const dispatch = useDispatch();
  const AllTypes = useSelector((state) => state.typesList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    weight: "",
    height: "",
    speed: "",
    type: [],
  });
  // const [disabledButton, setDisabledButton] = useState(true);

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // console.log(input);
  };

  const handlerFirstSelect = (e) => {
    console.log(input, "soy input");
    if (input.type.length === 0) {
      alert("Primero debes de escoger un primer tipo");
    }
    if (input.type.length <= 1) {
      setInput({
        ...input,
        type: [e.target.value],
      });
    } else if (e.target.value === input.type[1]) {
      setInput({
        ...input,
        type: [e.target.value],
      });
    } else {
      setInput({
        ...input,
        type: [e.target.value, input.type[1]],
      });
    }
  };

  const handlerSecondSelect = (e) => {
    console.log(input, "soy input2");
    if (input.type.length === 0) {
      alert("Primero debes de escoger tu primer tipo");
      e.target.value = "DEFAULT";
      return;
    }
    if (e.target.value === "removeType") {
      setInput({
        ...input,
        type: [input.type[0]],
      });
    } else if (e.target.value === input.type[0]) {
      setInput({
        ...input,
        type: [input.type[0]],
      });
    } else {
      setInput({
        ...input,
        type: [input.type[0], e.target.value],
      });
    }
  };

  const handlerCreatePokemon = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon({ ...input, name: input.name.toLowerCase() }));
    alert("Tu pokemon ha sido creado exitosamente");
    setInput({
      name: "",
      img: "",
      hp: "",
      attack: "",
      defense: "",
      weight: "",
      height: "",
      speed: "",
      type: [],
    });
    setTimeout(() => {
      navigate("/pokemons");
    }, 1000);
  };

  return (
    <div>
      <Link to="/pokemons">
        <button>Volver</button>
      </Link>
      <div className="contenedorGeneral">
        <form onSubmit={(e) => handlerCreatePokemon(e)}>
          <h1>Crea tu Pokemon !</h1>
          {/**PRIMERA COLUMNA */}
          <div>
            <div>
              <label>Name:</label>
              <input
                required
                type="text"
                name="name"
                value={input.name}
                // [0].toUpperCase() + ele.name.slice(1),
                placeholder="Name..."
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Hp:</label>
              <input
                type="number"
                name="hp"
                value={input.hp}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Attack:</label>
              <input
                type="number"
                name="attack"
                value={input.attack}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Defense:</label>
              <input
                type="number"
                name="defense"
                value={input.defense}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Weight:</label>
              <input
                type="text"
                name="weight"
                value={input.weight}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
          </div>
          {/**SEGUNDA COLUMNA */}
          <div>
            <div>
              <label>Height:</label>
              <input
                type="number"
                name="height"
                value={input.height}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Speed:</label>
              <input
                type="number"
                name="speed"
                value={input.speed}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Imagen:</label>
              <input
                type="text"
                name="img"
                value={input.img}
                placeholder="Url de tu imagen..."
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
            </div>
            <div>
              <label>Type:</label>
              <select
                defaultValue={"DEFAULT"}
                onChange={(e) => handlerFirstSelect(e)}
              >
                <option value="DEFAULT" disabled>
                  Select
                </option>
                {AllTypes &&
                  AllTypes.map((type) => {
                    return (
                      <option key={type.name} value={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label>Seccond type:</label>
              <select
                defaultValue={"DEFAULT"}
                onChange={(e) => handlerSecondSelect(e)}
                required
              >
                <option value="DEFAULT" disabled>
                  Select
                </option>
                {AllTypes &&
                  AllTypes.map((type) => {
                    return (
                      <option key={type.name} value={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
                <option value="removeType">Remove second type</option>
              </select>
            </div>
          </div>
          <button
          // disabled={disabledButton}
          // onClick={(e) => handlerCreatePokemon(e)}
          >
            CREAR POKEMON
          </button>
        </form>
      </div>
    </div>
  );
}
