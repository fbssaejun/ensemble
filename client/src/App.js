import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import LoginRegister from './components/LoginRegister';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';
import Band from './components/Band/index';
import Home from './components/Home';
import Search from './components/Search';
import ApplicationList from './components/Application/ApplicationList';
import { Route, Switch, useLocation } from 'react-router-dom';
import CreateBandForm from './components/CreateBandForm';
import BandManage from './components/BandManage/index';
import Footer from './components/Footer';
import './App.scss';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [state, setState] = useState({
    currentUser: sessionStorage.length
      ? { id: Number(sessionStorage.getItem('id')),
        username: sessionStorage.getItem('username'),
        profile_image: sessionStorage.getItem('profile_image')
      }
      : undefined,
  });

  const extendTransition = {
    duration: 1
  };

  const fadeTransition = {
    i:{
      opacity: 0
    },
    a:{
      opacity: 1
    },
    e:{
      opacity: 0
    },
  };

  const swipeUpTransition = {
    i:{
      opacity: 0,
      y: "-100vh"
    },
    a:{
      opacity: 1
    },
    export:{
      opacity: 0,
      y: "100vh"
    },
  };

  const swpieDownTransition = {
    i:{
      opacity: 0
    },
    a:{
      opacity: 1
    },
    e:{
      opacity: 0
    },
  };

  const location = useLocation();
  console.log(location);

  return (
    <main className="layout">
      <Navbar currentUser={state.currentUser} setState={setState} />
      {state.currentUser && <Chat />}
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route path="/users/:userId/app">
            <ApplicationList />
          </Route>
          <Route path="/users/:userId">
            <UserProfile />
          </Route>
          <Route path="/auth">
            <motion.div initial="i" animate="a" exit="e" variants={swipeUpTransition} transition={extendTransition}>
              <LoginRegister setState={setState} />
            </motion.div>
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
            <motion.div initial="i" animate="a" exit="e" variants={fadeTransition} transition={extendTransition}>
              <Home currentUser={state.currentUser} />
            </motion.div>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </main>
  );
}

export default App;
