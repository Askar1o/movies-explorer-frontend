import React from "react";
import "./NavigationPromo.css";
import { Link } from "react-router-dom";

function NavigationPromo() {
  return (
    <nav className="promo__nav-container">
      <ul className="promo__nav-list">
        <li>
          <Link
            className="promo__nav-link promo__nav-link_type_register"
            to={"/signup"}
          >
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            className="promo__nav-link promo__nav-link_type_login"
            to={"/signin"}
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationPromo;
