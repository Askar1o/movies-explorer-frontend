import React, { useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import useFormAndValidation from "../../hooks/FormValidation/useFormValidation";

function Profile({ onLogout }) {
  const [currentUser, setCurrentUser] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });

  const { values, errors, isValid, handleChange } = useFormAndValidation({
    name: currentUser.name,
    email: currentUser.email,
  });

  const [serverResError, setServerResError] = useState(false);
  const [isShowSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerResError(true);
  };

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" name="profile" onSubmit={handleSubmit}>
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
              required
            />
          </label>
          <span className="profile__span-error">{errors.email}</span>
          <p className="profile__response-error">
            {serverResError && "При обновлении профиля произошла ошибка."}
          </p>
          {isShowSaveButton ? (
            <button
              type="submit"
              className="profile__button profile__button_type_submit"
              disabled={!isValid}
            >
              Сохранить
            </button>
          ) : (
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
