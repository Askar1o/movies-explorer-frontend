import React from "react";
import Header from "../Header/Header";
import MovieSearch from "../Main/MovieSearch/MovieSearch";
import MovieList from "../Main/MovieList/MovieList";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <Header />
      <main>
        <MovieSearch />
        <MovieList />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
