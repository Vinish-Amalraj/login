import React from "react";
import { Navigate } from "react-router-dom";

const prologin = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : <Navigate to="/Login" />;
};

export default prologin;
