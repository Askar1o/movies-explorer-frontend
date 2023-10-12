import React from "react";
import Header from "../Header/Header";
import MovieSearch from "../Main/MovieSearch/MovieSearch";
import MovieList from "../Main/MovieList/MovieList";
import Footer from "../Footer/Footer";
import { useSearchFilms } from "../../hooks/FormValidation/SearchFilms/useSearchFilms";

function SavedMovies({ movies, onDelete, onError }) {
  const { sortedMovies, handleSearch, isLoading, text } = useSearchFilms({
    movies: movies,
    isSavedPage: true,
  });

  return (
    <>
      <Header />
      <main>
        <MovieSearch
          onSubmit={handleSearch}
          onError={onError}
          isSavedMoviesView={true}
        />
        <MovieList
          movies={sortedMovies}
          savedMovies={sortedMovies}
          isLoading={isLoading}
          text={text}
          onDelete={onDelete}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
