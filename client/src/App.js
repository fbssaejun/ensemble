import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';
import Band from './components/Band/index'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

function App() {
  const [state, setState] = useState({
    genres: [],
    users: [],
    bands: [],
    spots: [],
    currentUser: undefined
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/genres'),
      axios.get('/api/users'),
      axios.get('/api/bands'),
      axios.get('/api/spots')
    ]).then((all) => {
      const genres = all[0].data;
      const users = all[1].data;
      const bands = all[2].data;
      const spots = all[3].data;
      setState((prev) => ({ ...prev, genres, users, bands, spots }));
    });
  }, []);

  return (
    <main className="layout">
      <Router>
        <Navbar user={state.currentUser} setState={setState} />
        <Switch>
          <Route path="/users/:userId">
            <UserProfile users={state.users} />
          </Route>
          <Route path="/login">
            <Login setState={setState} />
          </Route>
          <Route path="/signup">
            <h1>This is for signup</h1>
            <Signup />
          </Route>
          <Route path="/bands/:bandId">
            <Band bands={state.bands} spots={state.spots}/>
          </Route>
          <Route path="/" exact>
            <h1>Blank Homepage</h1>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
