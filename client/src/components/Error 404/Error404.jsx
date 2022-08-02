import React from "react";
import { useDispatch } from "react-redux";

import error404 from "../../assets/img/404.png";
import { err404 } from "../../actions/index";
import styles from "../Error 404/Error404.module.css";

export default function Error404() {
  const dispatch = useDispatch();

  function handleClick(e) {
    dispatch(err404());
  }

  return (
    <div className="contenedor404">
      <div>
        <img src={error404} alt="" className={styles.imgError} />
      </div>
      <div>
        <button onClick={(e) => handleClick(e)} className={styles.buttonError}>
          {"<-"} BACK
        </button>
      </div>
    </div>
  );
}
