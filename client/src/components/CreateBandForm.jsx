import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormSpot from './FormSpot';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function CreateBandForm(props) {

  // Options for instruments and genres in our db:
  const [allInst, setAllInst] = useState([]);
  const [allGenre, setAllGenre] = useState([]);
  const [bandGenre, setBandGenre] = useState([]);

  // Leader's instrument:
  const [selectedInstLeader, setSelectedInstLeader] = useState("0");

  const [bandName, setBandName] = useState("");
  const [bandDesc, setBandDesc] = useState("");
  const [bandFeatured, setBandFeatured] = useState(false);
  const [bandImage, setBandImage] = useState("");
  const [spotArr, setSpotArr] = useState([]);
  const [leaderSpot, setLeaderSpot] = useState({
    title: "",
    username: props.currentUser.username,
    instrumentId: "",
    description: ""
  })

  const history = useHistory();

  useEffect(() => {
    Promise.all([
      axios.get('/api/instruments'),
      axios.get('/api/genres')
    ])
    .then((all) => {
      const inst = all[0].data;
      const genre = all[1].data;

      setAllInst([...inst]);
      setAllGenre([...genre]);

    })

  },[]);



  const submitForm = (event) => {
    event.preventDefault();

    const withLeaderSpot = [...spotArr, leaderSpot]

    axios.post('/api/bands/new', {
      leader_id: props.currentUser.id,
      name: bandName,
      description: bandDesc,
      band_image: bandImage,
      featured: bandFeatured,
      band_genre: bandGenre,
      spotData: spotConvert(withLeaderSpot)
    })
    .then(response => {
      const newBandId = response.data.result.band_id;
      history.push(`/bands/${newBandId}`)
    }).catch(e => console.log(e))
  }

  const spotConvert = (arr) => {
    const retObj = {title:[], username: [], instrumentId: [], description: []};
    arr.forEach((spot) => {
      retObj.title.push(spot.title);
      retObj.username.push(spot.username);
      retObj.instrumentId.push(spot.instrumentId);
      retObj.description.push(spot.description);
    })
    return retObj;
  }

  const addSpot = () => {
    setSpotArr((prev) => [...prev, {title:"", username:"", instrumentId:"", description:""}]);
  };

  const updateSpot = (index, changedSpot) => {
    const newSpots = [...spotArr]
    newSpots.splice(index, 1, changedSpot);
    setSpotArr((prev) => [...newSpots]);
  };

  const deleteSpot = (index) => {
    const newSpots = [...spotArr];
    newSpots.splice(index, 1);
    setSpotArr((prev) => [...newSpots]);
  };



  const materialsInst = allInst.map((instrument) => {
    return <MenuItem key={instrument.id} value={instrument.id}>{instrument.name}</MenuItem>
  });


  return(
  <div className="create-band-form">
    <form onSubmit={submitForm}>
      <div className="form-group-band">
        <h2>Create a new Band</h2>
        <input type="text" placeholder="Enter name of band" onChange={({ target }) => setBandName(target.value)} required/> <br/>
        <textarea rows="10" cols="50" type="text" placeholder="Enter a band description" onChange={({ target }) => setBandDesc(target.value)}/> <br/>
        <Autocomplete
            multiple
            onChange={(event, value) => setBandGenre(value)}
            id="tags-outlined"
            options={allGenre}
            getOptionLabel={(option) => option.name}
            Genres
            renderInput={(params) => (
              <TextField
                {...params}
                label="Genres"
                placeholder="Add More Genres"
              />
            )}
          />
        <input type="text" placeholder="Link to picture" onChange={({ target }) => setBandImage(target.value)}/> <br/>
        <label htmlFor="featuredCheck">Feature Band?</label> <br />
        <input type="checkbox" checked={bandFeatured} id="featuredCheck" onChange={() => setBandFeatured(!bandFeatured)}/>
        <h2>Your info</h2> 
        <input placeholder="title" onChange={({ target }) => setLeaderSpot((prev)=> ({...prev, title: target.value}))} required/>
        <FormControl sx={{ m: 1, minWidth: 100 }} required >
          <InputLabel id="leader-instrument-label">Instrument</InputLabel>
          <Select
            labelId="leader-instrument-label"
            id="leader-instrument"
            value={leaderSpot.instrumentId}
            label="Instrument"
            onChange={({ target }) => setLeaderSpot((prev)=> ({...prev, instrumentId: target.value}))}
          >
          {materialsInst}
          </Select>
        </FormControl>
        {/* <input placeholder="instrument id" onChange={({ target }) => setLeaderSpot((prev)=> ({...prev, instrumentId: target.value}))} required/> */}
        <input placeholder="description" onChange={({ target }) => setLeaderSpot((prev)=> ({...prev, description: target.value}))} required/>
        {spotArr.map((obj, index) => {
          return <FormSpot key={index} onDelete={() => {deleteSpot(index)}} onUpdate={updateSpot} index={index} spot={obj} />
        })}
        <button type="button" onClick={() => addSpot()}>Add A Spot</button>
        <button type="submit">Create band</button>
      </div>
    </form>
  </div>
  );

}