import { useEffect, useState } from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import './NewMyBand.scss'

export default function NewMyBand(props) {
  const [spots, setSpots] = useState([]);
  const { name, description, image, bandId, currentUser,
  featured, cachedBands, setCachedBands, bandImage } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=> {
    axios.get(`/api/spots/users/${currentUser.id}`).then((results) => {
      setSpots(results.data);
    })
  }, [])

  const mySpot = spots.filter((spot) => {
    return spot.band_id === bandId;
  })

  const leaveBand = (spotId) => {
    axios.patch(`/api/spots/${spotId}`, {userId:currentUser.id}).then((results) => {
      const updatedSpot = results.data.result.rows[0];
      const newBands = cachedBands.filter((band) => band.id !== updatedSpot.band_id)
      setCachedBands((prev) => [...newBands])
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="my-spot-band">
      <h3>{name}</h3>
      <div className="my-spot-band-image">
        <button className="leave-band-button" onClick={()=>handleOpen()}>&#215;</button>
        <img src={bandImage}/>
      </div>
      {mySpot.length && <h5>Title: <br/> {mySpot[0].title}</h5> }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="leave-band-warning">
            <h3>Are you sure you want to leave <i><u>{name}</u></i> ? </h3>
            <div className="leave-buttons">
              <button 
              className="app-button--reject third"
              onClick={(event)=>{
                event.preventDefault();
                leaveBand(mySpot[0].id)
              }}>Leave</button>
              <button 
              className="edit-band-button edit"
              onClick={()=> handleClose()}>Stay</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
  
}