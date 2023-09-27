import React, { useState } from "react";
import "./MovieSearch.css";

function MovieSearch({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState({
    searchString: "",
    isShortMovie: false,
  });

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, searchString: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setSearchQuery({ ...searchQuery, isShortMovie: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__input-container">
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
          name="searchString"
          onChange={handleChange}
        />
        <button className="search__input-button" type="submit" />
      </div>
      <label className="search__label">
        <div className="search__label-container">
          <input
            type="checkbox"
            className="search__checkbox-input"
            name="isShortMovie"
            onChange={handleChangeCheckbox}
          />
          <span className="search__checkbox-span"></span>
          <p className="search__checkbox-text">Короткометражки</p>
        </div>
      </label>
    </form>
  );
}

export default MovieSearch;
