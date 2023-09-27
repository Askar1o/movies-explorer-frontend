import React from "react";
import "./MovieList.css";
import Movie from "../Movie/Movie";
import { useLocation } from "react-router-dom";
import { DeviceContext } from "../../../contexts/DeviceContext/DeviceContext";
import { useContext, useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import { BEAT_API_URL } from "../../../utils/constant";

function MovieList({ movies, savedMovies, isLoading, text, onSave, onDelete }) {
  const device = useContext(DeviceContext);
  const location = useLocation();
  const [showMoreFilmsButton, setShowMoreFilmsButton] = useState(true);
  const [renderCount, setRenderCount] = useState(0);
  const [page, setPage] = useState(0);
  const [isPagginationLoading, setPagginationLoading] = useState(false);

  useEffect(() => {
    const setForFilmsRender = {
      desktop: {
        renderCount: 12,
        addedRender: 3,
      },
      tablet: {
        renderCount: 8,
        addedRender: 2,
      },
      mobile: {
        renderCount: 5,
        addedRender: 1,
      },
    };

    setRenderCount(
      setForFilmsRender[device].renderCount +
        setForFilmsRender[device].addedRender * page
    );

    movies.length >= renderCount
      ? setShowMoreFilmsButton(true)
      : setShowMoreFilmsButton(false);
  }, [device, movies, page, renderCount]);

  const handleClickRenderMore = () => {
    setShowMoreFilmsButton(false);
    setPagginationLoading(true);
    setTimeout(() => {
      setShowMoreFilmsButton(true);
      setPagginationLoading(false);
      setPage((e) => e + 1);
    }, 300);
  };

  /*const isSavedMovie = (movie) => {
    return savedMovies.reduce((acc, saved) => {
      if (saved.movieId === movie.id) {
        movie._id = saved._id;
        return true;
      }
      return acc;
    }, false);
  };*/

  const getImageLink = (movie) => {
    return movie.movieId ? movie.image : BEAT_API_URL + movie.image.url;
  };

  const getMovieId = (movie) => {
    return movie.movieId ? movie.movieId : movie.id;
  };

  const renderMovies = (renderCount) => {
    if (movies.length > 0) {
      return movies.slice(0, renderCount).map((film) => {
        return (
          <Movie
            key={getMovieId(film)}
            name={film.nameRU}
            duration={film.duration}
            link={getImageLink(film)}
            //saved={isSavedMovie(film)}
            movieData={film}
            onSave={onSave}
            onDelete={onDelete}
          />
        );
      });
    } else {
      return text;
    }
  };

  return (
    <main className="movies">
      <ul className="movies__list">
        {isLoading ? <Preloader /> : renderMovies(renderCount)}
      </ul>
      <div className="movies__container">
        {showMoreFilmsButton && (
          <button
            type="button"
            className={
              location.pathname === "/movies"
                ? "movies__show-more-button"
                : "movies__show-more-button movies__show-more-button_inactive"
            }
            onClick={handleClickRenderMore}
          >
            Ещё
          </button>
        )}
        {isPagginationLoading && <Preloader />}
      </div>
    </main>
  );
}

export default MovieList;
