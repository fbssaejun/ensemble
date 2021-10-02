import { useState, useEffect, Fragment } from "react";
import Options from './Options';
import axios from "axios";
import BandResultList from './BandResultList'
import UserResultList from './UserResultList';
import './Result.scss';


export default function Results(props) {
  const [genres, setGenres] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [selectedInstUser, setSelectedInstUser] = useState("0");
  const [selectedGenreUser, setSelectedGenreUser] = useState("0");
  const [selectedInstBand, setSelectedInstBand] = useState("0");
  const [selectedGenreBand, setSelectedGenreBand] = useState("0");
  const [checkAvailable, setCheckAvailable] = useState(false);

  const { userResult, bandResult, currentUser, searchOption} = props;
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/genres"),
      axios.get("/api/instruments")
    ])
    .then((all) => {
      const genres = all[0].data
      const instruments = all[1].data
      setGenres(genres)
      setInstruments(instruments)
    })
  }, [])


  const processedInst = instruments.map((instrument)=> {
    return <Options key={instrument.id} value={instrument.id} name={instrument.name} />
  })

  const processedGenre = genres.map((genre)=> {
    return <Options key={genre.id} value={genre.id} name={genre.name} />
  })


  return (
    <Fragment>
      {searchOption !== undefined &&
        <div className="search-results">
          {searchOption ? (
          <div className="user-results">
            <h1>This is Users</h1>
            <select value={selectedInstUser} onChange={({target}) => setSelectedInstUser(() => target.value)}>
              <option value={0}>All</option>
              {processedInst}
            </select>
            <select value={selectedGenreUser} onChange={({target}) => setSelectedGenreUser(() => target.value)}>
              <option value={0}>All</option>
              {processedGenre}
            </select>
            {userResult.length !== 0 && <UserResultList
              users={userResult}
              instrument={selectedInstUser}
              genre={selectedGenreUser}
            />}
          </div>) : (
          <div className="band-results">
            <h1>This is Bands</h1>
            <select value={selectedInstBand} onChange={({target}) => setSelectedInstBand(() => target.value)}>
              <option value={0}>All</option>
              {processedInst}
            </select>
            <select value={selectedGenreBand} onChange={({target}) => setSelectedGenreBand(() => target.value)}>
              <option value={0}>All</option>
              {processedGenre}
            </select>
            <input type="checkbox" checked={checkAvailable} onChange={() => setCheckAvailable(!checkAvailable)}/>
            {bandResult.length !== 0 && <BandResultList
              bands={bandResult}
              instrument={selectedInstBand}
              genre={selectedGenreBand}
              checkAvailable={checkAvailable}
              currentUser={currentUser}
            />}
          </div>
          )}
        </div>}
    </Fragment> 

  );
 
}


// <Result>
//   <UserResultList >
    
//   </UserResultList>
//   <BandResultList >
    
//   </BandResultList>
// </Result>