import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";

function ProtectedRoute() {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
