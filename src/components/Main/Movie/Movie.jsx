import React from "react";
import "./Movie.css";
import { useLocation } from "react-router-dom";

function Movie(props) {
  const { name, duration, saved, link } = props;
  const location = useLocation();

  return (
    <li className="movie">
      <div className="movie__heading-container">
        {location.pathname === "/movies" ? (
          saved ? (
            <button className="movie__saved-button movie__saved-button_active" />
          ) : (
            <button className="movie__saved-button">Сохранить</button>
          )
        ) : (
          <button type="button" className="movie__delete-button" />
        )}
        <img src={link} alt={name} className="movie__image" />
        <div className="movie__heading">
          <h1 className="movie__name">{name}</h1>
          <p className="movie__duration">{duration}</p>
        </div>
      </div>
    </li>
  );
}

export default Movie;
