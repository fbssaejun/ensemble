import React from 'react';
import '../Navbar.scss'
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard';

export default function Navbar(props) {

  return (
    <header>
      <nav>
          <Link to="/"><h2>Ensemble</h2></Link>
          <div className="search-bar">
            <Link to="/search">Begin Your Search</Link>
          </div>
          {!props.currentUser ? (<div className="user">
            <Link to="/auth">Get Started</Link>
          </div>) : (
          <React.Fragment>
            <Dashboard currentUser={props.currentUser} setState={props.setState}/>
            
          </React.Fragment>
          )}

      </nav>
    </header>
  );
}
