import React from 'react';
import './Navbar.scss'
import { Link, Switch, Route } from 'react-router-dom';
import UserProfile from './UserProfile';


export default function Navbar(props) {

  const logOut = () => {
    props.setState(prev => ({...prev, currentUser: undefined}))
  }

  const goToProfile = () => {

  }

  return (
    <header>
      <nav>
          <Link to="/"><h2>Ensemble</h2></Link>
          <div className="search-bar">
            <input type="text" placeholder="Search Band" />
            <button>Search</button>
          </div>
          {!props.user ? (<div className="user">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>) : (
          <React.Fragment>
            <Link to={`/users/${props.user}`}> Profile {props.user} </Link>
            <button type="submit" onClick={logOut}>Logout</button>
          </React.Fragment>
          )}

      </nav>
    </header>
  );
}

