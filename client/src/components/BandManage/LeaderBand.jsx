/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import SpotList from './SpotList';
import EditBandForm from './EditBandForm';
import axios from 'axios';

import './LeaderBand.scss';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';


export default function LeaderBand(props) {
  const [spots, setSpots] = useState([]);
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
      <div className="band-name-edit-button">
        <h3>{name}</h3>
        <button className="edit-band-button edit" onClick={handleOpen}>Edit</button>
        <Modal
          open={open}
          onClose={handleClose}
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
      <div className="leader-band-image">
        <img src={image ? image : "https://media.istockphoto.com/vectors/fiddler-vector-id452097777?k=20&m=452097777&s=612x612&w=0&h=tEiPg3SQNeclfnvT24V7NFusHxe0291xOKZPBg1Sq-8="}/>
      </div>
      <div className="spot-list-accordion">
        <Accordion className="leader-band-accordian">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SpotList bandId={bandId} currentUser={currentUser} spots={spots} setSpots={setSpots}/>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}
