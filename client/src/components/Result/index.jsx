import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import BandResultList from './BandResultList'
import UserResultList from './UserResultList';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  const materialsInst = instruments.map((instrument) => {
    return <MenuItem key={instrument.id} value={instrument.id}>{instrument.name}</MenuItem>
  });

  const materialsGenre = genres.map((genre)=> {
    return <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
  });


  return (
    <Fragment>
      {searchOption !== undefined &&
        <div className="search-results">
          {searchOption ? (
          <div className="user-results">
            <h1>This is Users</h1>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="user-instrument-label">Instrument</InputLabel>
              <Select
                labelId="user-instrument-label"
                id="user-instrument"
                value={selectedInstUser}
                label="Instrument"
                onChange={({target}) => setSelectedInstUser(() => target.value)}
              >
              <MenuItem value={"0"}>All</MenuItem>
              {materialsInst}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="user-genre-label">Genre</InputLabel>
              <Select
                labelId="user-genre-label"
                id="user-genre"
                value={selectedGenreUser}
                label="Genre"
                onChange={({target}) => setSelectedGenreUser(() => target.value)}
              >
              <MenuItem value={"0"}>All</MenuItem>
              {materialsGenre}
              </Select>
            </FormControl>
            {userResult.length !== 0 && <UserResultList
              users={userResult}
              instrument={selectedInstUser}
              genre={selectedGenreUser}
            />}
          </div>) : (
          <div className="band-results">
            <h1>This is Bands</h1>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="band-instrument-label">Instrument</InputLabel>
              <Select
                labelId="band-instrument-label"
                id="band-instrument"
                value={selectedInstBand}
                label="Instrument"
                onChange={({target}) => setSelectedInstBand(() => target.value)}
              >
              <MenuItem value={"0"}>All</MenuItem>
              {materialsInst}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="band-genre-label">Genre</InputLabel>
              <Select
                labelId="band-genre-label"
                id="band-genre"
                value={selectedGenreBand}
                label="Genre"
                onChange={({target}) => setSelectedGenreBand(() => target.value)}
              >
              <MenuItem value={"0"}>All</MenuItem>
              {materialsGenre}
              </Select>
            </FormControl>
            <Checkbox checked={checkAvailable} onChange={() => setCheckAvailable(!checkAvailable)} />
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

