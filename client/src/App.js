import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import LoginRegister from './components/LoginRegister'
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';
import Band from './components/Band/index';
import Home from './components/Home';
import Search from './components/Search';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateBandForm from './components/CreateBandForm';
import './App.scss';

function App() {
  const [state, setState] = useState({
    genres: [],
    users: [],
    bands: [],
    spots: [],
    currentUser: undefined,
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/genres'),
      axios.get('/api/users'),
      axios.get('/api/bands'),
      axios.get('/api/spots'),
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
        <Navbar currentUser={state.currentUser} setState={setState}  />
        <Switch>
          <Route path="/users/:userId/app">
            <UserProfile users={state.users} />
          </Route>
          <Route path="/users/:userId">
            <UserProfile users={state.users} />
          </Route>
          <Route path="/auth">
            <LoginRegister setState={setState} />
          </Route>
          <Route path="/search">
            <Search currentUser={state.currentUser} />
          </Route>
          <Route path="/bands/new">
            <CreateBandForm currentUser={state.currentUser} />
          </Route>
          <Route path="/bands/:bandId">
            <Band bands={state.bands} spots={state.spots} />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
