import "./App.css";
import Landing from "../Landing/Landing";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useState, useEffect, Suspense, useCallback } from "react";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {
  DeviceContext,
  windowWidth,
} from "../../contexts/DeviceContext/DeviceContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { api } from "../../utils/MainApi";
import { apiMovies } from "../../utils/MoviesApi";
import { ApiServiceContext } from "../../contexts/ApiServiceContext/ApiServiceContext";
import { BEAT_API_URL, LOCAL_STORAGE_TOKEN_KEY } from "../../utils/constant";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [device, setDevice] = useState("desktop");
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
  });
  const [apiService, setApiService] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (
      currentUser.isLoggedIn &&
      (pathname === "/signup" || pathname === "/signin")
    ) {
      navigate("/movies", { replace: true });
    }
  }, [pathname, navigate, currentUser.isLoggedIn]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      apiMovies
        .getMovies()
        .then(setMovies)
        .catch((e) => console.error(e));
      api
        .getSavedMovies()
        .then((movies) => setSavedMovies(movies))
        .catch((e) => console.error(e));
    }
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > windowWidth.tablet) {
        setDevice("desktop");
      } else if (window.innerWidth > windowWidth.mobile) {
        setDevice("tablet");
      } else {
        setDevice("mobile");
      }
    };

    handleWidth();
    window.addEventListener("resize", handleWidth);

    return () => window.removeEventListener("resize", handleWidth);
  }, [device]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      checkToken();
    }
  }, [currentUser.isLoggedIn]);

  const checkToken = () => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser({
          name: user.name,
          email: user.email,
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setCurrentUser({ isLoggedIn: false });
      });
  };

  const enableLoader = () => {
    setApiService((past) => ({ ...past, isLoading: true }));
  };

  const disableLoader = () => {
    setApiService((past) => ({ ...past, isLoading: false }));
  };

  const handleError = (err) => {
    setApiService((past) => ({ ...past, isError: true, errorText: err }));
  };

  const handleLogin = ({ email, password }) => {
    enableLoader();
    api
      .login({ email, password })
      .then(() => {
        setCurrentUser({ ...currentUser, isLoggedIn: true });
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => handleError(err))
      .finally(() => disableLoader());
  };

  const handleRegister = ({ name, email, password }) => {
    enableLoader();
    api
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => disableLoader());
  };

  const handleChangeProfile = ({ name, email }) => {
    enableLoader();
    api
      .setUserInfo({ name, email })
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.data.name,
          email: userData.data.email,
        });
        setApiService((past) => ({
          ...past,
          isError: false,
          successText: `Данные обновлены.`,
        }));
      })
      .catch((err) => handleError(err))
      .finally(() => disableLoader());
  };

  const handleSearchError = () => {
    handleError("Для поиска фильма нужно ввести букву");
  };

  const handleLogout = () => {
    api
      .logout()
      .then(() => {
        navigate("/", { replace: true });
        localStorage.clear();
        setCurrentUser({ name: "", email: "", isLoggedIn: false });
      })
      .catch((err) => console.log(err))
      .finally(() => disableLoader());
  };

  const handleClickSaveMovie = (movie) => {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: BEAT_API_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: BEAT_API_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    api
      .saveMovie(movieData)
      .then((savedMovie) =>
        setSavedMovies((movies) => {
          console.log(movies);
          return [...movies, savedMovie];
        })
      )
      .catch((e) => console.error(e));
  };

  const handleClickDeleteMovie = (movieId) => {
    api
      .deleteMovie(movieId)
      .then(() =>
        setSavedMovies((movies) =>
          movies.filter((movie) => movie._id !== movieId)
        )
      )
      .catch((e) => console.error(e));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DeviceContext.Provider value={device}>
        <ApiServiceContext.Provider value={apiService}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/signup"
                element={
                  <Register onLogin={handleLogin} onRegister={handleRegister} />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login onLogin={handleLogin} onRegister={handleRegister} />
                }
              />
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/profile"
                  element={
                    <Profile
                      onLogout={handleLogout}
                      onSubmit={handleChangeProfile}
                    />
                  }
                />
                <Route
                  path="/movies"
                  element={
                    <Main
                      movies={movies}
                      savedMovies={savedMovies}
                      onSave={handleClickSaveMovie}
                      onDelete={handleClickDeleteMovie}
                      onError={handleSearchError}
                    />
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    <SavedMovies
                      movies={savedMovies}
                      onDelete={handleClickDeleteMovie}
                      onError={handleSearchError}
                    />
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ApiServiceContext.Provider>
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
