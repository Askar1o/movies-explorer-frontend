import React, { useState } from "react";
import "./Movie.css";
import { useLocation } from "react-router-dom";

function Movie(props) {
  const { name, duration, saved, link, movieData, onSave, onDelete } = props;
  const location = useLocation();
  const [isSaveMovie, setSaveMovie] = useState(false);

  return (
    <li className="movie">
      <div className="movie__heading-container">
        {location.pathname === "/movies" && isSaveMovie && (
          <button
            className="movie__saved-button movie__saved-button_active"
            onClick={() => onDelete(movieData._id)}
          />
        )}
        {location.pathname === "/movies" && !isSaveMovie && (
          <button
            className="movie__saved-button"
            onClick={() => onSave(movieData)}
          >
            Сохранить
          </button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            className="movie__delete-button"
            onClick={() => onDelete(movieData._id)}
          />
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
