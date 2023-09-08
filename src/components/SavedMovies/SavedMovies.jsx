import React from "react";
import Header from "../Header/Header";
import MovieSearch from "../Main/MovieSearch/MovieSearch";
import MovieList from "../Main/MovieList/MovieList";
import Footer from "../Footer/Footer";
 
function SavedMovies() {
  return (
    <>
      <Header />
      <MovieSearch />
      <MovieList />
      <Footer />
    </>
  );
}

export default SavedMovies;