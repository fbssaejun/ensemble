import React from 'react';
import './Navbar.scss'
import { Link, useHistory } from 'react-router-dom';

export default function Navbar(props) {
  const history = useHistory();
  const logOut = () => {
    props.setState(prev => ({...prev, currentUser: undefined}))
    history.push("/");
  }

  return (
    <header>
      <nav>
          <Link to="/"><h2>Ensemble</h2></Link>
          <div className="search-bar">
            <Link to="/search">Begin Your Search</Link>
          </div>
          {!props.currentUser ? (<div className="user">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>) : (
          <React.Fragment>
            <Link to={`/users/${props.currentUser.id}`}> Profile {props.currentUser.username} </Link>
            <Link to="/bands/new">Create New Band</Link>
            <button type="submit" onClick={logOut}>Logout</button>
          </React.Fragment>
          )}

      </nav>
    </header>
  );
}

