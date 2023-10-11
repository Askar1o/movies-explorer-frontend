import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import useFormAndValidation from "../../hooks/FormValidation/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import { ApiServiceContext } from "../../contexts/ApiServiceContext/ApiServiceContext";
import Preloader from "../Preloader/Preloader";

function Profile({ onLogout, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, setValues, setValid } =
    useFormAndValidation({
      name: currentUser.name,
      email: currentUser.email,
    });

  const { isLoading, isError, text, isSuccessText, successText } =
    useContext(ApiServiceContext);
  const [isShowSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    setValues((data) => ({
      ...data,
      name: currentUser.name,
      email: currentUser.email,
    }));
  }, [currentUser, setValues]);

  useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setValid(false);
    }
  }, [currentUser, values, setValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: values.name, email: values.email });
    if (errors && isError) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  };

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="profile__label">
            <span className="profile__input-title">Имя</span>
            <input
              type="text"
              className="profile__input"
              name="name"
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.name}
              minLength={2}
              maxLength={30}
              disabled={isLoading}
              required
            />
          </label>
          <span className="profile__span-error">{errors.name}</span>
          <label className="profile__label">
            <span className="profile__input-title">E-mail</span>
            <input
              type="email"
              className="profile__input"
              name="email"
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.email}
              disabled={isLoading}
              pattern={
                "^[A-Za-z0-9\\._%\\+\\-]+@([A-Za-z0-9\\-]+\\.)+[A-Za-z]{2,}$"
              }
              required
            />
          </label>
          <span className="profile__span-error">{errors.email}</span>
          <p className="profile__response-error">
            {isError ? text : successText}
          </p>
          {isLoading && <Preloader />}
          {isShowSaveButton && !isLoading && (
            <button
              type="submit"
              className="profile__button profile__button_type_submit"
              disabled={!isValid}
            >
              Сохранить
            </button>
          )}
          {!isShowSaveButton && !isLoading && (
            <>
              <button
                type="button"
                className="profile__button"
                onClick={handleEditButtonClick}
              >
                Редактировать
              </button>
              <button
                type="button"
                className="profile__button profile__button_type_logout"
                onClick={onLogout}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

export default Profile;
