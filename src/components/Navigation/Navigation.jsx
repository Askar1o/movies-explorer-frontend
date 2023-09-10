import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./Navigation.css";
import NavigationPromo from "./NavigationPromo/NavigationPromo";
import NavigationMovies from "./NavigationMovies/NavigationMovies";
import { DeviceContext } from "../../contexts/DeviceContext/DeviceContext";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function Navigation() {
  const location = useLocation();
  const device = useContext(DeviceContext);
  const [menuActive, setMenuActive] = useState(false);
  const [isDesktop, setDesktop] = useState(true);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    if (device === "desktop") {
      setDesktop(true);
      setMenuActive(false);
    } else {
      setDesktop(false);
    }
  }, [device]);

  return (
    <>
      {location.pathname === "/" ? (
        <NavigationPromo />
      ) : (
        <>
          {isDesktop ? (
            <NavigationMovies isDesktop={isDesktop} />
          ) : (
            <button
              type="button"
              className="header__burger-button"
              onClick={toggleMenu}
            />
          )}
          <BurgerMenu active={menuActive} onCloseMenu={toggleMenu} />
        </>
      )}
    </>
  );
}

export default Navigation;
