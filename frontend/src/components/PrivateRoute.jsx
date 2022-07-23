import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/authStatus";
import Spinner from "./Spinner";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner></Spinner>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
