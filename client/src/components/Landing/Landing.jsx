import React from "react";
import { Link } from "react-router-dom";

import styles from "../Landing/Landing.module.css";

function Landing() {
  return (
    // <div className={styles.contenedorInicio}>
    //   <div className={styles.contenedorButton}>
    //     <Link to={"/home"}>
    //       <button className={styles.btn}>INGRESAR</button>
    //     </Link>
    //   </div>
    // </div>
    <div className={styles.contenedorInicio}>
      <div className={styles.contenedorButton}>
        <Link to={"/home"}>
          <button className={styles.button}>
            <span className={styles.span}>INGRESAR</span>
            <i className={styles.i}></i>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
