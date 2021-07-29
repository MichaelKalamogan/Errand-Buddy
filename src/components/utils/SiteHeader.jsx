import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../style/SiteHeader.scss";

const SiteHeader = (props) => {
  const history = useHistory();
  const token = localStorage.getItem("jwt")
  const userId = localStorage.getItem("userId")
  const [log, setLog]=useState(false)


  const logout = (next) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    props.setAuth(false);
    setLog(!log);
    next();
  };
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
      <Link to="/">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/Errand-Buddy-Logo.png"}
          alt="logo"
        />
      </Link>

      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navb"
        aria-expanded="true"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div id="nav-links" className="navbar ">
        <ul>
          <li className="first-link">
            <Link to="/">Home</Link>
          </li>
          <li className="other-links">
            <Link to="/add-errand">Find a Buddy</Link>
          </li>
          <li className="other-links">
            <Link to={`/dashboard/${userId}`}>Your Dashboard</Link>
          </li>
          <li className="other-links">
            <Link to={`/chat/${userId}`}>Messages</Link>
          </li>
          <li className="other-links">
            <Link to={`/support`}>Support</Link>
          </li>
        </ul>
      </div>

      <div id="login-links">
        <ul>
          <li>
            {!token ? (
              <div className="nav-link" href="#">
                <Link to="/register">
                  <span className="fas fa-user"></span>
                  Sign up
                </Link>
              </div>
            ) : (
              <strong className="nav-link authUser">
                Hello, {localStorage.getItem("username")}
              </strong>
            )}
          </li>
          <li className="nav-item">
            <div className="nav-link" href="/#">
              {!token ? (
                <Link to="/login" className="navbar-link">
                  <span className="fas fa-sign-in-alt"></span>
                  Login
                </Link>
              ) : (
                <Link
                  to="/"
                  className="navbar-link"
                  onClick={() => logout(() => history.push("/"))}
                >
                  <span className="fas fa-sign-in-alt"></span>
                  Logout
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SiteHeader;
