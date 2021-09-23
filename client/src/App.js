import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar";

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
    <Navbar genres={state.genres}/>
    
  </main>
  );
}

export default App;
