import React from "react";
import "./Portfolio.css"
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link className="portfolio__link" target="blank" to={"https://github.com/Askar1o/how-to-learn"}>
            Статичный сайт <span className="portfolio__icon">&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link" target="blank" to={"https://github.com/Askar1o/russian-travel"}>
            Адаптивный сайт <span className="portfolio__icon">&#8599;</span>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link" target="blank" to={"https://github.com/Askar1o/react-mesto-api-full-gha"}>
            Одностраничное приложение <span className="portfolio__icon">&#8599;</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;