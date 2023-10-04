import React, { useState } from "react";
import "./AuthForm.css";
import useFormAndValidation from "../../hooks/FormValidation/useFormValidation";
import { Link } from "react-router-dom";
import Label from "../Label/Label";

function AuthForm({ onLogin, onRegister, isRegForm }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();
  const [serverResError, setServerResError] = useState(false);
  const { name, email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
    isRegForm
      ? onRegister({ email, password, name })
      : onLogin({ email, password });
  };

  return (
    <form name="register" className="form" onSubmit={handleSubmit}>
      {isRegForm && (
        <Label
          title="Имя"
          name="name"
          handleChange={handleChange}
          values={values}
          errors={errors}
          minLength={2}
          maxLength={30}
        />
      )}
      <Label
        title="E-mail"
        name="email"
        handleChange={handleChange}
        values={values}
        errors={errors}
        pattern={"^[A-Za-z0-9\\._%\\+\\-]+@([A-Za-z0-9\\-]+\\.)+[A-Za-z]{2,}$"}
      />
      <Label
        title="Пароль"
        name="password"
        handleChange={handleChange}
        values={values}
        errors={errors}
        minLength={6}
      />
      <p
        className={`form__response-error ${
          !isRegForm && "form__response-error_type_login"
        }`}
      >
        {serverResError && "Пример текста"}
      </p>
      <button
        className={`form__submit-button ${
          !isValid && "form__submit-button_disabled"
        }`}
        type="submit"
      >
        {isRegForm ? "Зарегистрироваться" : "Войти"}
      </button>
      <p className="form__link-name">
        {isRegForm ? (
          <>
            Уже зарегистрированы?
            <Link className="form__link" to="/signin">
              Войти
            </Link>
          </>
        ) : (
          <>
            Ещё не зарегистрированы?
            <Link className="form__link" to="/signup">
              Регистрация
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

export default AuthForm;
