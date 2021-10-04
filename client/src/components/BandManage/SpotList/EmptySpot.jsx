import { useState  } from "react";
import axios from 'axios';
import SpotApplicationList from "./SpotApplicationList";
import { Avatar } from "@mui/material";

import './Spot.scss';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';

export default function EmptySpot (props) {
  const { spots, spot, setSpots, currentUser } = props;
  const [showApplications, setShowApplications] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteSpot = (spotId) => {
    axios.delete(`/api/spots/${spotId}`).then((results) => {
      const newSpots = spots.filter((spot) => spot.id !== results.data.result.rows[0].id)
      setSpots((prev) => [...newSpots])
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

  
  const testImage = "https://cdn2.bulbagarden.net/upload/1/1b/Pok%C3%A9mon_hunter_Garbodor.png"

  return (
    <div className="spot-container--empty">
      <div className="delete-spot-button">
        <span></span>
        <button className="delete-button" onClick={(event)=>{
          event.preventDefault();
          deleteSpot(spot.id)}}>&#215;</button>
      </div>
      <div className="profile-avatar">
        <Avatar alt="Profile Pic" src={testImage} sx={{ width: 50, height: 50 }} />
      </div>
      <div className="applications-show-button">
        <button className="status-button first" onClick={handleOpen}>status</button>
        <Modal
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <div className="show-apps-modal">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <SpotApplicationList spotId={spot.id} />
            </Typography>
          </div>
        </Modal>
      </div>
    </div>
  );
}