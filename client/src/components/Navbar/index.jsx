import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { Fragment } from 'react';
import Dashboard from "./Dashboard";
import logo from "./ensemble.png";

export default function Navbar(props) {

  return (
    <header>
      <nav>
        <Link to="/">
          <img
            src={logo}
            className="logo"
            width="120px"
            height="30px"
            alt="logo"
          />
        </Link>
          <div class="theme-toggle">
            <input type="checkbox" />
              <div class="toggle-body"></div>
              <div class="celestial-body"></div>
          </div>
        {!props.currentUser ? (
          <Fragment>
          <div className="search-bar">
            <Link to="/search">Search Bands</Link>
          </div>
          <div className="user">
            <Link to="/auth">Get Started</Link>
          </div>
          </Fragment>
        ) : (
          <div className="search-and-icon">
            <div className="search-bar">
              <Link to="/search">Search</Link>
            </div>
            <Dashboard
              currentUser={props.currentUser}
              setState={props.setState}
            />
            </div>
        )}
      </nav>
    </header>
  );
}
