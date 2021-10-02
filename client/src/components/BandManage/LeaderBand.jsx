/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import SpotList from './SpotList';
import EditBandForm from './EditBandForm';
import axios from 'axios';

import './LeaderBand.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function LeaderBand(props) {
  const [spots, setSpots] = useState([]);
  const [showEditBandForm, setShowEditBandForm] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { name, description, image, bandId, currentUser, featured, cachedBands, setCachedBands } = props;

  useEffect(()=> {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      setSpots(results.data)
    })
  }, [])


  return (
    <div className="leader-band-item">
      <div>
        <h2>Band Name: {name}</h2>
        <div>
          <button onClick={handleOpen}>Edit</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="edit-band-form-modal">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Band
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <EditBandForm
                  setCachedBands={setCachedBands} 
                  onClose={handleClose} 
                  bandInfo={props}
                  />
              </Typography>
            </div>
          </Modal>
        </div>
      </div>
      <SpotList bandId={bandId} currentUser={currentUser} spots={spots} setSpots={setSpots}/>
    </div>
  )
}
