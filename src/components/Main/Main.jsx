import React, { useState } from "react";
import "./Main.css";
import Header from "../Header/Header";
import MovieSearch from "./MovieSearch/MovieSearch";
import MovieList from "./MovieList/MovieList";
import Footer from "../Footer/Footer";
import { useSearchFilms } from "../../hooks/FormValidation/SearchFilms/useSearchFilms";

function Main({ movies, savedMovies, onSave, onDelete }) {
  const { sortedMovies, handleSearch, isLoading, text } = useSearchFilms(movies);

  return (
    <>
      <Header />
      <main>
        <MovieSearch onSubmit={handleSearch} />
        <MovieList
          movies={sortedMovies}
          savedMovies={savedMovies}
          text={text}
          isLoading={isLoading}
          onSave={onSave}
          onDelete={onDelete}
        />
      </main>
      <Footer />
    </>
  );
}

export default Main;
