import axios from "axios";
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import './AddSpotItem.scss';

export default function AddSpotItem(props) {
  const { bandId, spots, setSpots } = props;
  const [showSpotForm, setShowSpotForm] = useState(false);
  const [username, setUsername] = useState("")
  const [instrumentId, setInstrumentId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false);

  const [allInst, setAllInst] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const findInstImage = (instrumentId) => {
    for (const inst of allInst) {
      if (inst.id === instrumentId) {
        return inst.instrument_image
      }
    }
  }


  const addSpot = (bandId) => {
    axios.post('/api/spots/new', {
      bandId: bandId,
      username: username,
      instrumentId: instrumentId, 
      title: title, 
      description: description}).then((results) => {
      const newSpot = results.data.result.rows[0];
      newSpot.instrument_image = findInstImage(instrumentId);
      setSpots((prev) => [...prev, newSpot])
    })
  }

  useEffect(() => {
    axios.get("/api/instruments")
    .then(result => {
      setAllInst(result.data);
    })

  }, [])

  const materialsInst = allInst.map((instrument) => {
    return (
      <MenuItem key={instrument.id} value={instrument.id}>
        {instrument.name}
      </MenuItem>
    );
  });


  return(
    <div className="add-spot-item-container">
      <button className="add-spot-button" type="button" onClick={handleOpen}>+</button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="add-spot-form-modal">          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="add-spot-form-container">
              <div className="add-spot-form-close-button">
                <span></span>
                <button className="delete-button" onClick={handleClose}>X</button>
              </div>
              <h1 className="add-spot-form-title">Add a spot</h1>
              <form 
              className="add-spot-form"
              onSubmit={(event) => {event.preventDefault();
                addSpot(bandId);
                setShowSpotForm(!showSpotForm);
                
              }}>
                <input type="text" placeholder="Username" value={username} onChange={({target}) => setUsername(target.value)}></input>
                <FormControl sx={{ m: 1, minWidth: 230 }} required>
                  <InputLabel id="user-instrument-label">Instrument</InputLabel>
                  <Select
                    labelId="user-instrument-label"
                    id="user-instrument"
                    value={instrumentId}
                    label="Instrument"
                    onChange={({target}) => setInstrumentId(() => target.value)}
                  >
                  {materialsInst}
                  </Select>
                </FormControl>
                <input type="text" placeholder="title" value={title} onChange={({target}) => setTitle(target.value)}></input>
                <input type="text" placeholder="description" value={description} onChange={({target}) => setDescription(target.value)}></input>
                <button className="add-spot-form-submit-button fourth">Add</button>
              </form>
            </div>
          </Typography>
        </div>
      </Modal>
    </div>
  )
}