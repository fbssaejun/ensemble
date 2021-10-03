import { useState, useEffect } from 'react';
import './CreateBandForm.scss';
import axios from 'axios';

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";



export default function FormSpot(props) {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [instrumentId, setInstrumentId] = useState("");
  const [description, setDescription] = useState("");

  const [allInst, setAllInst] = useState([]);


  useEffect(() => {
    axios.get("/api/instruments")
    .then(results => {
      const inst = results.data;
      setAllInst([...inst]);      
    })

  },[])

  const materialsInst = allInst.map((instrument) => {
    return (
      <MenuItem key={instrument.id} value={instrument.id}>
        {instrument.name}
      </MenuItem>
    );
  });


  useEffect(() => {
    props.onUpdate(props.index, {...props.spot,  title,  username,  instrumentId, description})
  }, [title, username, instrumentId, description])

  return(
    <div className="form-group-spot">
      <h2>New Spot</h2>
      <input type="text" placeholder="Title" onChange={({ target }) => setTitle(target.value)} required/> <br/>
      <input type="text" placeholder="Description" onChange={({ target }) => setDescription(target.value)}/> <br/>
      <FormControl className="select-instrument" required>
        <InputLabel id="leader-instrument-label">Instrument</InputLabel>
        <Select
          labelId="leader-instrument-label"
          id="leader-instrument"
          value={instrumentId}
          label="Instrument"
          onChange={({ target }) => setInstrumentId(target.value)}
        >
          {/* <MenuItem value={null}>{"Empty"} </MenuItem> */}
          {materialsInst}
        </Select>
      </FormControl>
      <br/><br/>
      <label for="enter-username">Have any member in mind?</label>
      <input type="text" placeholder="Empty Spot / Enter Username" id="enter-username" onChange={({ target }) => setUsername(target.value)} /> <br/>
      <br/><br/>
      <button className="delete-button" type="button" onClick={props.onDelete}><i class="far fa-trash-alt"></i></button>
    </div>
  )
}