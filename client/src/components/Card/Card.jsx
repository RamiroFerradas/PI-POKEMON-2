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
      <div>
        <h1 className={styles.detallesCard}>{name}</h1>
        <img className={styles.imgCard} src={img} alt={name} />
      </div>
      <div>
        <h4 className={styles.detallesCard}>Type: {type.join(", ")}</h4>
      </div>
    </div>
  );
}
