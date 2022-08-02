import React, { useState, useEffect } from "react";

import { getTypes, postPokemon, cleanCache } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import getPokemons from "../../actions";
import { useNavigate } from "react-router-dom";

import styles from "../Pokemon Create/PokemonCreate.module.css";

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

  let cleanAndBack = () => {
    navigate("/home");
    dispatch(cleanCache());
  };

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
    // console.log(input);
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
    if (
      allPokemons.find(
        (pokemon) => pokemon.name.toUpperCase() === input.name.toUpperCase()
      )
    )
      errors.name =
        "Ya existe un pokemon con ese nombre, prueba con escoger otro";
    if (!input.name)
      errors.name = "Tu poke necesita un nombre, escoge el mejor";
    if (/[1-9]/.test(input.name))
      errors.name = "El nombre de tu poke no puede contener numeros";
    if (/[\s]/.test(input.name))
      errors.name = "El nombre de tu poke no puede contener espacios";
    if (/[^\w\s]/.test(input.name))
      errors.name =
        "El nombre de tu poke no puede contener caracteres especiales";
    if (input.name[0] === " ")
      errors.name = "El primer caracter no puede ser un espacio";
    if (input.hp > 200 || input.hp < 1 || !/\d/g.test(input.hp))
      errors.hp = "El valor debe estar entre 1 y 200";
    if (input.attack > 200 || input.attack < 1 || !/\d/g.test(input.attack))
      errors.attack = "El valor debe estar entre 1 y 200 at";
    if (input.defense > 100 || input.defense < 1 || !/\d/g.test(input.defense))
      errors.defense = "El valor debe estar entre 1 y 100 def";
    if (input.speed > 100 || input.speed < 1 || !/\d/g.test(input.speed))
      errors.speed = "El valor debe estar entre 1 y 100 sp";
    if (input.height > 100 || input.height < 1 || !/\d/g.test(input.height))
      errors.height = "El valor debe estar entre 1 y 100";
    if (input.weight > 100 || input.weight < 1 || !/\d/g.test(input.weight))
      errors.weight = "El valor debe estar entre 1 y 100";
    if (!/\.(jpg|png|gif)$/i.test(input.img))
      errors.img = "La url que intentas colocar no es valida";
    return errors;
  }
  const [errors, setErrors] = useState({});

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    // console.log(errors, "soy el errors");
    if (
      input.name === "" ||
      /[1-9]/.test(input.name) ||
      /[\s]/.test(input.name) ||
      /[^\w\s]/.test(input.name) ||
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
      <div className={styles.card}>
        <div className={styles.card__content}>
          <div className={styles.formulario}></div>
          <form>
            <h1 className={styles.tituloForm}>Crea tu Pokemon !</h1>
            {/*PRIMERA COLUMNA */}
            <div className={styles.textoForm}>
              <div className={styles.primerColumna}>
                <div className={styles.name}>
                  <div className={styles.group}>
                    <label className={styles.labelName}>Name:</label>
                    <input
                      // required
                      type="text"
                      name="name"
                      value={input.name}
                      placeholder="Name..."
                      onChange={(e) => handlerChange(e)}
                      className={styles.inputsForm}
                      autoComplete="off"
                    />
                    <span class={styles.highlight}></span>
                    <span class={styles.bar}></span>
                    <div className={styles.errors}>
                      {errors.name && <p>{errors.name}</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.hp}>
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
                    <div className={styles.errors}>
                      {errors.hp && <p>{errors.hp}</p>}
                    </div>
                  </div>
                  <div className={styles.attack}>
                    <label>Attack:</label>
                    <input
                      type="range"
                      name="attack"
                      max="200"
                      value={input.attack}
                      placeholder="Ejem: 12"
                      onChange={(e) => handlerChange(e)}
                      autoComplete="off"
                    />
                    <span>{input.attack}</span>
                    <div className={styles.errors}>
                      {errors.attack && <p>{errors.attack}</p>}
                    </div>
                  </div>
                  <div className={styles.defense}>
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
                    <div className={styles.errors}>
                      {errors.defense && (
                        <p className={styles.errors}>{errors.defense}</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.weight}>
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
                    <div className={styles.errors}>
                      {errors.weight && <p>{errors.weight}</p>}
                    </div>
                  </div>
                </div>
              </div>
              {/*SEGUNDA COLUMNA */}
              <div className={styles.segundaColumna}>
                <div className={styles.height}>
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
                  <div className={styles.errors}>
                    {errors.height && <p>{errors.height}</p>}
                  </div>
                </div>

                <div className={styles.speed}>
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
                  <div className={styles.errors}>
                    {errors.speed && <p>{errors.speed}</p>}
                  </div>
                </div>

                <div className={styles.imagen}>
                  <label>Imagen:</label>
                  <input
                    type="text"
                    name="img"
                    value={input.img}
                    placeholder="Url de tu imagen..."
                    onChange={(e) => handlerChange(e)}
                    className={styles.inputsForm}
                    autoComplete="off"
                  />
                  <div className={styles.errors}>
                    {errors.img && <p>{errors.img}</p>}
                  </div>
                </div>
                <div className={styles.type}>
                  <label> Type:</label>
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
                <div className={styles.type}>
                  <label>Type:</label>
                  <select
                    defaultValue={"DEFAULT"}
                    onChange={(e) => handlerSecondSelect(e)}
                    required
                  >
                    <option value="DEFAULT" disabled>
                      Select
                    </option>
                    <option value="removeType">Remove second type</option>
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
              </div>
            </div>
            <button
              disabled={disabledButton}
              onClick={(e) => handlerCreatePokemon(e)}
              className={styles.btnCreate}
            >
              CREAR POKEMON
            </button>
          </form>
        </div>
      </div>
      <button onClick={cleanAndBack} className={styles.buttonBack}>
        {"<-"} VOLVER
      </button>
    </div>
  );
}
