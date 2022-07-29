import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTypes, postPokemon } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import getPokemons from "../../actions";
import { useNavigate } from "react-router-dom";
// import PokemonCreate from "../Pokemon Create/PokemonCreate.css";
import "./PokemonCreate.css";
import Loading from "../Loading/Loading";

export function PokemonCreate() {
  const dispatch = useDispatch();
  const AllTypes = useSelector((state) => state.typesList);
  const navigate = useNavigate();
  const allPokemons = useSelector((state) => state.pokemons);

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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  };

  const handlerFirstSelect = (e) => {
    console.log(input, "soy input");

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
      navigate("/home");
    }, 900);
  };

  /**Errores */

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Se requiere un Nombre";
    }
    return errors;
  }
  const [errors, setErrors] = useState({});

  // let validate = (input) => {
  //   let errors = {};
  //   let search = allPokemons.find(
  //     (e) => e.name.toLowerCase() === input.name.toLowerCase()
  //   );
  //   if (search) errors.name = "Ya existe un pokémon con ese nombre";
  //   if (!input.name || input.name.length > 20)
  //     errors.name = "El nombre debe tener entre 1 y 20 caracteres";
  //   if (input.name[0] === " ")
  //     errors.name = "El primer caracter no puede ser un espacio";
  //   if (input.hp > 1000 || input.hp < 1 || !/\d/g.test(input.hp))
  //     errors.hp = "El valor debe estar entre 1 y 1000";
  //   if (input.attack > 1000 || input.attack < 1 || !/\d/g.test(input.attack))
  //     errors.attack = "El valor debe estar entre 1 y 1000";
  //   if (input.defense > 1000 || input.defense < 1 || !/\d/g.test(input.defense))
  //     errors.defense = "El valor debe estar entre 1 y 1000";
  //   if (input.speed > 1000 || input.speed < 1 || !/\d/g.test(input.speed))
  //     errors.speed = "El valor debe estar entre 1 y 1000";
  //   if (input.height > 1000 || input.height < 1 || !/\d/g.test(input.height))
  //     errors.height = "El valor debe estar entre 1 y 1000";
  //   if (input.weight > 1000 || input.weight < 1 || !/\d/g.test(input.weight))
  //     errors.weight = "El valor debe estar entre 1 y 1000";
  //   return errors;
  // };

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    console.log(errors, "soy el errors");
    if (
      input.name === "" ||
      input.type.length < 1 ||
      input.hp.length < 1 ||
      input.attack.length < 1 ||
      input.defense.length < 1 ||
      input.speed.length < 1 ||
      input.height.length < 1 ||
      input.weight.length < 1
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [errors, input, setDisabledButton]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <div className="contenedorGeneral">
        <form>
          <h1>Crea tu Pokemon !</h1>
          {/*PRIMERA COLUMNA */}
          <div>
            <div>
              <label>Name:</label>
              <input
                // required
                type="text"
                name="name"
                value={input.name}
                placeholder="Name..."
                onChange={(e) => handlerChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
          </div>
          <div>
            <div>
              <label>Hp:</label>
              <span value={input.hp}></span>
              {/* <span>{input}</span> */}
              <input
                type="range"
                min="0"
                max="200"
                name="hp"
                value={input.hp}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
              />
              <span>{input.hp}</span>
              {errors.hp && <p>{errors.hp}</p>}
            </div>
            <div>
              <label>Attack:</label>
              <input
                type="range"
                name="attack"
                value={input.attack}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
              <span>{input.attack}</span>
              {errors.hp && <p>{errors.hp}</p>}
            </div>
            <div>
              <label>Defense:</label>
              <input
                type="range"
                name="defense"
                value={input.defense}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
              <span>{input.defense}</span>
            </div>
            <div>
              <label>Weight:</label>
              <input
                type="range"
                name="weight"
                value={input.weight}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
              <span>{input.weight}</span>
            </div>
          </div>
          {/*SEGUNDA COLUMNA */}
          <div>
            <div>
              <label>Height:</label>
              <input
                type="range"
                name="height"
                value={input.height}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
              <span>{input.height}</span>
            </div>
            <div>
              <label>Speed:</label>
              <input
                type="range"
                name="speed"
                value={input.speed}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
              <span>{input.speed}</span>
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
            disabled={disabledButton}
            onClick={(e) => handlerCreatePokemon(e)}
          >
            CREAR POKEMON
          </button>
        </form>
        {/* {input.type.map((el) => (
          <div>
            <p>{el}</p>
            <button onClick={() => handlerDelete(el)}>x</button>
          </div>
        ))} */}
      </div>
    </div>
  );
}
