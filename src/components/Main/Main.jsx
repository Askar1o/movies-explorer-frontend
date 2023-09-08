import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import MovieSearch from "./MovieSearch/MovieSearch";
import MovieList from "./MovieList/MovieList";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
      <Header />
      <MovieSearch />
      <MovieList />
      <Footer />
    </>
  );
}

export default Main;