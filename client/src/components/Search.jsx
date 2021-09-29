import axios from "axios";
import { useEffect, useState, Fragment } from "react";
// import Options from './Result/Options';
import Result from './Result'


export default function Search(props) {

  const [searchTerm, setSearchTerm] = useState("");
  const [userResult, setUserResult] = useState([]);
  const [bandResult, setBandResult] = useState([]);

  useEffect(()=> {



  },[searchTerm])
  
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



  return(
    <Fragment>
    <form onSubmit={searchField}>
      <input type="text" placeholder="Find your Band" onChange={({ target }) => setSearchTerm(target.value)}/>
      <button type="submit">Submit</button> <br/>
    </form>
    <Result userResult={userResult} bandResult={bandResult} />
    </Fragment>

  )
}

