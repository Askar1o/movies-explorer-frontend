import React from "react";
import "./MovieSearch.css";

function MovieSearch() {
  return (
    <form className="search">
      <div className="search__input-container">
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
        />
        <button className="search__input-button" />
      </div>
      <label className="search__label">
        <div className="search__label-container">
          <input type="checkbox" className="search__checkbox-input" />
          <span className="search__checkbox-span"></span>
          <p className="search__checkbox-text">Короткометражки</p>
        </div>
      </label>
    </form>
  );
}

export default MovieSearch;
