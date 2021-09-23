import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

function App() {
  const [state, setState] = useState({
    genres: []
  })
  
  useEffect(() => {
    axios.get('/api/genres').then((all) => {
      const genres = all.data
      setState((prev)=>({ ...prev, genres }))
    })
  },[]);

  return (
  <main className="layout">
    <Router>  
      <Navbar genres={state.genres}/>
      <Switch>
        {/* <Route path="">
        </Route> */}
      </Switch>
    </Router>
  </main>
  );
}

export default App;
