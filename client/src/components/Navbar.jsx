import React from 'react';
import './Navbar.scss'
import { Link } from 'react-router-dom';


export default function Navbar(props) {

  return (
    <header>
      <nav>
          <Link to="/"><h2>Ensemble</h2></Link>
          <div className="search-bar">
            <input type="text" placeholder="Search Band" />
            <button>Search</button>
          </div>
          <div className="user">
            {false && <span>user-icon</span>}
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
 
      </nav>
    </header>
  );
}