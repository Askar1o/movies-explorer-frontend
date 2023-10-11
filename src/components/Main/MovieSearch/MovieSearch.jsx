import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MovieSearch.css";
import { LOCAL_STORAGE_LAST_SEARCH_QUERY } from "../../../utils/constant";

function MovieSearch({ onSubmit, isLoading, onError, isSavedMoviesView }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState({
    searchString: "",
    isShortMovie: false,
  });

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY)
    ) {
      const { searchString, isShortMovie } = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY)
      );
      setSearchQuery({
        searchString,
        isShortMovie,
      });
    }
  }, [location]);

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, searchString: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    /*if (!searchQuery.searchString.trim()) {
      onError();
      return setSearchQuery({ ...searchQuery, searchString: "" });
    }
    setSearchQuery({ ...searchQuery, isShortMovie: e.target.checked });
    onSubmit({ ...searchQuery, isShortMovie: e.target.checked });*/
    if (isSavedMoviesView || searchQuery.searchString.trim()) {
      setSearchQuery({ ...searchQuery, isShortMovie: e.target.checked });
      onSubmit({ ...searchQuery, isShortMovie: e.target.checked });
    } else {
      onError();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.searchString.trim()) {
      onError();
      return setSearchQuery({ ...searchQuery, searchString: "" });
    }
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
          disabled={isLoading}
          value={searchQuery.searchString}
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
            disabled={isLoading}
            checked={searchQuery.isShortMovie}
          />
          <span className="search__checkbox-span"></span>
          <p className="search__checkbox-text">Короткометражки</p>
        </div>
      </label>
    </form>
  );
}

export default MovieSearch;
