import axios from "axios";
import { useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';

import './AddSpotItem.scss';

export default function AddSpotItem(props) {
  const { bandId, spots, setSpots } = props;
  const [showSpotForm, setShowSpotForm] = useState(false);
  const [username, setUsername] = useState("")
  const [instrumentId, setInstrumentId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addSpot = (bandId) => {
    axios.post('/api/spots/new', {bandId: bandId, username: username, instrumentId: instrumentId, title: title, description: description}).then((results) => {
      const newSpot = results.data.result.rows[0]
      setSpots((prev) => [...prev, newSpot])
    })
  }

  const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;


  return(
    <div className="add-spot-item-container">
      <button className="add-spot-button" type="button" onClick={handleOpen}>+</button>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <div className="add-spot-form-modal">          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="add-spot-form-container">
              <div className="add-spot-form-close-button">
                <span></span>
                <button onClick={handleClose}>X</button>
              </div>
              <h1 className="add-spot-form-title">Add a spot</h1>
              <form onSubmit={(event) => {event.preventDefault();
                addSpot(bandId);
                setShowSpotForm(!showSpotForm);
              }}>
                <input type="text" placeholder="Username" value={username} onChange={({target}) => setUsername(target.value)}></input>
                <input type="text" placeholder="instrument" value={instrumentId} onChange={({target}) => setInstrumentId(target.value)}></input>
                <input type="text" placeholder="title" value={title} onChange={({target}) => setTitle(target.value)}></input>
                <input type="text" placeholder="description" value={description} onChange={({target}) => setDescription(target.value)}></input>
                <button>Add</button>
              </form>
            </div>
          </Typography>
        </div>
      </Modal>
    </div>
  )
}