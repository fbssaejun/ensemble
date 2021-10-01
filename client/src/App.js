import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginRegister from './components/LoginRegister';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';
import Band from './components/Band/index';
import Home from './components/Home';
import Search from './components/Search';
import ApplicationList from './components/Application/ApplicationList';
import UserEdit from './components/UserProfile/UserEdit';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateBandForm from './components/CreateBandForm';
import BandManage from './components/BandManage/index';
import './App.scss';

function App() {
  const [state, setState] = useState({
    currentUser: undefined
  });


  return (
    <main className="layout">
      <Router>
        <Navbar currentUser={state.currentUser} setState={setState} />
        <Switch>
          <Route path="/users/:userId/app">
            <ApplicationList />
          </Route>
          <Route path="/users/:userId">
            <UserProfile />
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
          <Route path="/bands/manage">
            <BandManage currentUser={state.currentUser} />
          </Route>
          <Route path="/bands/:bandId">
            <Band />
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
