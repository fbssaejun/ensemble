import axios from "axios";
import { useState } from "react";
import Result from './Result'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import './Search.scss';

import { useTransition, animated } from 'react-spring';


export default function Search(props) {

  const [searchTerm, setSearchTerm] = useState("");
  const [userResult, setUserResult] = useState([]);
  const [bandResult, setBandResult] = useState([]);
  const [searchOption, setSearchOption] = useState();
  const [toggleAn, setToggleAn] = useState(false);
  
  const searchField = (event)=>{
    event.preventDefault()

    const params = {
      term: searchTerm
    }    
    axios.get("/api/search/", { params })
    .then(result => {
      setUserResult(() => [...result.data.usersResult]);
      setBandResult(() => [...result.data.bandsResult]);
    })
  };

  const transition = useTransition(toggleAn, {
    from:{ x: 0, y: -20, opacity:0},
    enter:{ x:0, y:0, opacity: 1},
    leave:{},
  })

  return(
    <div className="search-page">
      <h1 className="searching-for">I am searching for a...</h1>
      <form className="search-button-form">
        <input type="radio" name="rdo" id="yes" onClick={(prev) => {
          setSearchOption(true);
          setToggleAn(true);
          }} />
        <input type="radio" name="rdo" id="no" onClick={(prev) => {
          setSearchOption(false)
          setToggleAn(true);
          }} />
        <div className="switch">
          <label for="yes">Player</label>
          <label for="no">Band</label>
        </div>
      </form>
      {transition((style, item) =>
      item ? (<animated.div style={style}>
        <form onSubmit={searchField} className="search-button-form">
          <FormControl sx={{ width: '40ch',  }}>
          <TextField
            label="Your Search"
            id="filled-size-normal"
            onChange={({ target }) => setSearchTerm(target.value)}
            variant="filled"
          />
          <button className="search-button">
            <span> Submit </span>
          </button>
          </FormControl>
        </form>
        <Result 
        userResult={userResult}
        bandResult={bandResult}
        currentUser={props.currentUser}
        searchOption={searchOption}
        />
      </animated.div>) : '') }
      <div className="search-page-footer-down"></div>
    </div>
  )
}

