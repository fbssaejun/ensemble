import React from 'react';
import './Navbar.scss'
import { Link } from 'react-router-dom';


export default function Navbar(props) {

  const logOut = () => {
    props.setState(prev => ({...prev, currentUser: undefined}))
  }

  return (
    <header>
      <nav>
          <Link to="/"><h2>Ensemble</h2></Link>
          <p>{props.user}</p>
          <div className="search-bar">
            <input type="text" placeholder="Search Band" />
            <button>Search</button>
          </div>
          {!props.user ? (<div className="user">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>) : (
          <React.Fragment>
            <button type="submit" onClick={logOut}>Logout</button>
          </React.Fragment>
          )}

      </nav>
    </header>
  );
}

