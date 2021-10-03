/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import SpotList from './SpotList';
import EditBandForm from './EditBandForm';
import axios from 'axios';

import './LeaderBand.scss';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';


export default function LeaderBand(props) {
  const [spots, setSpots] = useState([]);
  // const [showEditBandForm, setShowEditBandForm] = useState(false);
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



  return (
    <div className="leader-band-item">
      <div>
        <h2>Band Name: {name}</h2>
        <button onClick={handleOpen}>Edit</button>
        <Modal
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <div className="edit-band-form-modal">
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
      <SpotList bandId={bandId} currentUser={currentUser} spots={spots} setSpots={setSpots}/>
    </div>
  )
}
