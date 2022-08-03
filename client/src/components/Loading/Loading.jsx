import React from "react";
import load from "../../assets/img/loading3.gif";
import styles from "../Loading/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.contenedorLoading}>
      <img src={load} alt="loading" />
    </div>
  );
}
