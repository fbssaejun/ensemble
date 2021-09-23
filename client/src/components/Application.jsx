import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";

export default function Application(props){
  
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
