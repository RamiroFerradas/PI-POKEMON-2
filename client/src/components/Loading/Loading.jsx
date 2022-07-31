import React from "react";
import load from "../../assets/img/loading3.gif";
import "./Loading.css";
// import { useNavigate } from "react-router-dom";
// import { cleanCache } from "../../actions";
// import { useDispatch } from "react-redux";
export default function Loading() {
  // let navigate = useNavigate();
  // const dispatch = useDispatch();

  // let cleanAndBack = () => {
  //   navigate("/home");
  //   dispatch(cleanCache());
  // };
  return (
    <div className="contenedorLoading">
      <img src={load} alt="loading" />
      {/* <div>
        {" "}
        <button onClick={cleanAndBack} className="buttonBack">
          {"<-"} BACK
        </button>
      </div> */}
    </div>
  );
}
