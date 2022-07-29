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
  // const allPokemons = useSelector((state) => state.pokemons);

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
    // setError(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
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
      navigate("/pokemons");
    }, 1000);
  };

  // const [error, setError] = useState({});

  // function validate(input) {
  //   let errors = {};
  //   if (
  //     allPokemons.find(
  //       (pokemon) => pokemon.name.toUpperCase() === input.name.toUpperCase()
  //     )
  //   )
  //     errors.name =
  //       "Ya existe un pokemon con ese nombre, prueba con escoger otro";
  //   if (!input.name)
  //     errors.name = "Tu poke necesita un nombre, escoge el mejor";
  //   if (/[1-9]/.test(input.name))
  //     errors.name = "El nombre de tu poke no puede contener numeros";
  //   if (/[\s]/.test(input.name))
  //     errors.name = "El nombre de tu poke no puede contener espacios";
  //   if (/[^\w\s]/.test(input.name))
  //     errors.name =
  //       "El nombre de tu poke no puede contener caracteres especiales";

  //   if (input.hp < 1)
  //     errors.hp = "Necesitas colocar un valor mayor o igual a 1";
  //   if (input.hp === "")
  //     errors.hp = "No te olvides de colocar la vida de tu poke";
  //   if (input.hp > 200) errors.hp = "La vida no puede ser superior a 200";

  //   if (input.attack < 1)
  //     errors.attack = "Necesitas colocar un valor mayor o igual a 1";
  //   if (input.attack === "")
  //     errors.attack = "Coloca que tan poderoso es tu poke";
  //   if (input.attack > 200)
  //     errors.attack = "El ataque no puede ser superior a 200";

  //   if (input.defense < 1)
  //     errors.defense = "Necesitas colocar un valor mayor o igual a 1";
  //   if (input.defense === "")
  //     errors.defense = "Coloca que tan resistente es tu poke";
  //   if (input.defense > 200)
  //     errors.defense = "La defensa no puede ser superior a 200";

  //   if (input.speed < 1)
  //     errors.speed = "Necesitas colocar un valor mayor o igual a 1";
  //   if (input.speed === "") errors.speed = "Coloca que tan rapido es tu poke";
  //   if (input.speed > 200)
  //     errors.speed = "La velocidad no puede ser superior a 200";

  //   if (input.height < 1)
  //     errors.height = "Necesitas colocar un valor mayor o igual a 1";
  //   if (input.height === "")
  //     errors.height = "No te olvides colocar que tan grande es tu poke";
  //   if (input.height > 200)
  //     errors.height = "La tamanio no puede ser superior a 200";

  //   if (input.weight < 1)
  //     errors.weight = "Necesitas colocar un valor mayor o igual a 1";
  //   if (input.weight === "")
  //     errors.weight = "Cuentanos que tan pesado es tu poke";
  //   if (input.weight > 200)
  //     errors.weight = "El peso no puede ser superior a 200";

  //   if (!/\.(jpg|png|gif)$/i.test(input.img))
  //     errors.img = "La url que intentas colocar no es valida";
  //   if (!input.img)
  //     errors.img = "Se requiere una URL para la imagen de tu poke";
  //   return errors;
  // }
  // const [disabledButton, setDisabledButton] = useState(true);

  // useEffect(() => {
  //   if (
  //     input.name === "" ||
  //     input.type.length < 1 ||
  //     error.hasOwnProperty("name") ||
  //     error.hasOwnProperty("img") ||
  //     error.hasOwnProperty("hp") ||
  //     error.hasOwnProperty("attack") ||
  //     error.hasOwnProperty("defense") ||
  //     error.hasOwnProperty("speed") ||
  //     error.hasOwnProperty("height") ||
  //     error.hasOwnProperty("weight")
  //   ) {
  //     setDisabledButton(true);
  //   } else {
  //     setDisabledButton(false);
  //   }
  // }, [error, input, setDisabledButton]);

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
              <label data-help="Debes ingresar el nombre de tu pokemon !">
                Name:
              </label>
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
              <span value={input.hp}></span>
              {/* <span>{input}</span> */}
              <input
                type="range"
                min="0"
                max="100"
                name="hp"
                value={input.hp}
                placeholder="Ejem: 12"
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
              />
              <span>100</span>
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
          // className={style.buttonCreatePokemon}
          >
            CREAR POKEMON
          </button>
        </form>
      </div>
    </div>
  );
}
