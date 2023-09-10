import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <Link to={'/'}><img src={logo} className="header__logo" alt="Логотип сайта" /></Link>
      <Navigation />
    </header>
  );
}

export default Header;
