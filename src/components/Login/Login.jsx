import React from "react";
import "./Login.css";
import AuthForm from "../AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";

function Login({ onLogin, onRegister }) {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="auth__logo" onClick={() => navigate("/")}></div>
      <h2 className="auth__title">Рады видеть!</h2>
      <AuthForm onLogin={onLogin} onRegister={onRegister} isRegForm={false} />
    </div>
  );
}

export default Login;
