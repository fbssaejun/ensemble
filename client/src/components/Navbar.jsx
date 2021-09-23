import React from 'react';
import './Navbar.scss'


export default function Navbar(props) {

  return (
    <header>
      <nav>
          <h2>Ensemble</h2>
          <div className="search-bar">
            <input type="text" placeholder="Search Band" />
            <button>Search</button>
          </div>
          <div className="user">
            {false && <span>user-icon</span>}
            <a href="">Login</a>
            <a href="">Register</a>
            {/* <button>chat</button> */}
          </div>
 
      </nav>
    </header>
  );
}