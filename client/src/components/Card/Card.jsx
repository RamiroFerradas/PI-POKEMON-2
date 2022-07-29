import React from "react";
import Loading from "../Loading/Loading";
import "./Card.css";

export default function Card({ name, img, type }) {
  return !Card.length ? (
    <Loading />
  ) : (
    // <div>
    //   <h2>{name}</h2>
    //   <img src={img} alt="pokemon" width="200px" height="250px" />
    //   <h5>{type}</h5>
    // </div>
    <div className="card">
      <div className="content">
        <div className="front">
          <h3 className="title">{name}</h3>
          <img
            className="subtitle"
            src={img}
            alt="pokemon"
            width="200px"
            height="250px"
          />
        </div>

        <div className="back">
          <h5 className="description">{type}</h5>
        </div>
      </div>
    </div>
  );
}
