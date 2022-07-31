import React from "react";
import Loading from "../Loading/Loading";
import styles from "../Card/Card.module.css";

export default function Card({ name, img, type }) {
  return !Card.length ? (
    <Loading />
  ) : (
    // <div>
    //   <h2>{name}</h2>
    //   <img src={img} alt="pokemon" width="200px" height="250px" />
    //   <h5>{type}</h5>
    // </div>

    <div className={styles.cardHome}>
      <div className="front">
        <h3 className={styles.titleCard}>{name}</h3>
        <img className={styles.imgCard} src={img} alt="pokemon" />
      </div>
      <div className={styles.TypesCard}>
        <h5 className="description">Type: {type.join(", ")}</h5>
      </div>
    </div>
  );
}
