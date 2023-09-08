import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationMovies.css";

function NavigationMovies({ isDesktop }) {
  return (
    <nav className="nav-movies__container">
      <ul className="nav-movies__list">
        {!isDesktop && (
          <li className="nav-movies__item">
            <NavLink
              className={({ isActive }) =>
                `nav-movies__link nav-movies__link_type_default ${
                  isActive && "nav-movies__link_active"
                }`
              }
              to={"/"}
            >
              Главная
            </NavLink>
          </li>
        )}
        <li className="nav-movies__item">
          <NavLink
            className={({ isActive }) =>
              `nav-movies__link nav-movies__link_type_default ${
                isActive && "nav-movies__link_active"
              }`
            }
            to="/movies"
          >
            Фильмы
          </NavLink>
        </li>
        <li className="nav-movies__item">
          <NavLink
            className={({ isActive }) =>
              `nav-movies__link nav-movies__link_type_default ${
                isActive && "nav-movies__link_active"
              }`
            }
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <Link
        className="nav-movies__link nav-movies__link_type_profile"
        to="/profile"
      >
        Аккаунт
      </Link>
    </nav>
  );
}

export default NavigationMovies;
