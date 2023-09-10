import React from "react";
import "./BurgerMenu.css";
import NavigationMovies from "../NavigationMovies/NavigationMovies";

function BurgerMenu({ active, onCloseMenu }) {
  return (
    <div className={active ? "burger-menu burger-menu_active" : "burger-menu"}>
      <div className="burger-menu__blur" onClick={onCloseMenu}>
        <div
          className="burger-menu__container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="burger-menu__close-btn"
            onClick={onCloseMenu}
          />
          <NavigationMovies />
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
