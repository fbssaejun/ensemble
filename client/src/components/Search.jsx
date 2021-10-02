import axios from "axios";
import { useState } from "react";
import Result from './Result'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import './Search.scss';


export default function Search(props) {

  const [searchTerm, setSearchTerm] = useState("");
  const [userResult, setUserResult] = useState([]);
  const [bandResult, setBandResult] = useState([]);
  const [searchOption, setSearchOption] = useState();
  
  const searchField = (event)=>{
    event.preventDefault()

    const params = {
      term: searchTerm
    }

    console.log("new search triggered")
    
    axios.get("/api/search/", { params })
    .then(result => {
      setUserResult(() => [...result.data.usersResult]);
      setBandResult(() => [...result.data.bandsResult]);
    })

  };

  return(
    <div className="search-page">
      <h1 className="searching-for">I am searching for a...</h1>
      <form>
        <input type="radio" name="rdo" id="yes" onClick={(prev) => {setSearchOption(true)}} />
        <input type="radio" name="rdo" id="no" onClick={(prev) => {setSearchOption(false)}} />
        <div className="switch">
          <label for="yes">Player</label>
          <label for="no">Band</label>
        </div>
      </form>
      {searchOption !== undefined &&
      <form onSubmit={searchField} className="search-btn">
        <FormControl sx={{ width: '40ch' }}>
        <TextField
          label="Your Search"
          id="filled-size-normal"
          onChange={({ target }) => setSearchTerm(target.value)}
          variant="filled"
        />
        </FormControl>
        {/* <button type="submit" className="search-btn">Submit</button> <br/> */}
      </form>}
      <Result 
        userResult={userResult}
        bandResult={bandResult}
        currentUser={props.currentUser}
        searchOption={searchOption}
      />
    </div>

  )
}

