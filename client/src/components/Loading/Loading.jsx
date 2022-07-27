import React from "react";
import load from "../../assets/img/loading3.gif";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="contenedorLoading">
      <img src={load} alt="loading" />
    </div>
  );
}
