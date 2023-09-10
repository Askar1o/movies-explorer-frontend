import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__date">&#169; 2023</p>
        <ul className="footer__links">
          <li className="footer__element">
            <Link className="footer__link" to="https://practicum.yandex.ru">
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__element">
            <Link className="footer__link" to={"https://github.com/Askar1o"}>
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
