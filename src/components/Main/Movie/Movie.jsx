import React, { useState } from "react";
import "./Movie.css";
import { Link, useLocation } from "react-router-dom";

function Movie(props) {
  const { name, duration, saved, link, movieData, onSave, onDelete } = props;
  const location = useLocation();

  const calculateDuration = () => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hours > 0 ? hours + "ч" : ""} ${minutes + "м"}`;
  };

  return (
    <li className="movie">
      <div className="movie__heading-container">
        {location.pathname === "/movies" && saved && (
          <button
            className="movie__saved-button movie__saved-button_active"
            onClick={() => onDelete(movieData._id)}
          />
        )}
        {location.pathname === "/movies" && !saved && (
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
        <Link
          to={movieData.trailerLink}
          target="blank"
          className="movie__trailer-link"
        >
          <img src={link} alt={name} className="movie__image" />
        </Link>
        <div className="movie__heading">
          <h1 className="movie__name">{name}</h1>
          <p className="movie__duration">{calculateDuration(duration)}</p>
        </div>
      </div>
    </li>
  );
}

export default Movie;
