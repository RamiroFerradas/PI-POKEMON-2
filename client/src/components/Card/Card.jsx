import React from "react";
import Loading from "../Loading/Loading";

export default function Card({ name, img, type }) {
  return Card.length < 1 ? (
    <Loading />
  ) : (
    <div>
      <h2>{name}</h2>
      <img src={img} alt="pokemon" width="200px" height="250px" />
      <h5>{type}</h5>
    </div>
  );
}
