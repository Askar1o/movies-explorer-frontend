import "./App.css";
import Landing from "../Landing/Landing";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useState, useEffect } from "react";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {
  DeviceContext,
  windowWidth,
} from "../../contexts/DeviceContext/DeviceContext";

function App() {
  const navigate = useNavigate();
  const [device, setDevice] = useState("desktop");

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

  const handleLogin = () => {
    navigate("/movies", { replace: true });
  };

  const handleRegister = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <DeviceContext.Provider value={device}>
      <Routes>
        <Route
          path="/signup"
          element={
            <Register onLogin={handleLogin} onRegister={handleRegister} />
          }
        />
        <Route
          path="/signin"
          element={<Login onLogin={handleLogin} onRegister={handleRegister} />}
        />
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        <Route path="/" element={<Landing />} />
        <Route path="/movies" element={<Main />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DeviceContext.Provider>
  );
}

export default App;
