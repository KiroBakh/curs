import React, { useState } from "react";
import "../styles/Header.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

function Header({ username, password }) {
  const location = useLocation();
  let del = false;

  const [authenticated, setAuthenticated] = useState(false);

  if (location.pathname === "/") {
    del = true;
  }

  // Определите, когда показывать вкладку "Конструктор"
  const showConstructorLink =
    authenticated || (username === "admin" && password === "admin");

  return (
    <>
      <header className="header">
        <div className="links">
          <NavLink to={"/"}>
            <span className="logo ">Military Hospital</span>
          </NavLink>
          <nav className="navbar-expand-lg">
            <div className="navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/api/employees" className="nav-link">
                    Співробітники
                  </NavLink>
                </li>

                <li className="nav-item auth">
                  <NavLink to="/api/auth" className="nav-link">
                    Авторизація
                  </NavLink>
                </li>

                {showConstructorLink && (
                  <li className="nav-item">
                    <NavLink to="/api/employee" className="nav-link">
                      Конструктор
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {del ? (
        <div className="homePage">
          <h1 className="title">Санітарна частина</h1>
        </div>
      ) : (
        ""
      )}
      <Outlet />

      <Footer />
    </>
  );
}

export default Header;
