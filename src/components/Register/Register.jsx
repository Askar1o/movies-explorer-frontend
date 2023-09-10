import React from "react";
import "./Register.css";
import AuthForm from "../AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";

function Register({ onLogin, onRegister }) {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <div className="auth__logo" onClick={() => navigate("/")}></div>
      <h2 className="auth__title">Добро пожаловать!</h2>
      <AuthForm onLogin={onLogin} onRegister={onRegister} isRegForm={true} />
    </div>
  );
}

export default Register;
