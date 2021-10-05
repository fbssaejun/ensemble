import axios from "axios";
import { Avatar } from "@mui/material";

import './Spot.scss';

export default function FilledSpot(props) {
  const { spots, spot, setSpots, currentUser } = props;

  const deleteSpot = (spotId) => {
    axios.delete(`/api/spots/${spotId}`).then((results) => {
      const newSpots = spots.filter((spot) => spot.id !== results.data.result.rows[0].id)
      setSpots((prev) => [...newSpots])
    })
  }

  // const testImage = "https://cdn2.bulbagarden.net/upload/4/49/Ash_Pikachu.png"
  
  return (
    <div className="spot-container--filled">
      <div className="delete-spot-button">
        <span></span>
        <button className="delete-button" onClick={(event)=>{
          event.preventDefault();
          deleteSpot(spot.id)}}>&#215;</button>
      </div>
      <div className="profile-avatar">
        <Avatar alt={spot.username} src={spot.profile_image ? spot.profile_image : "/"} sx={{ width: 50, height: 50 }} />
      </div>
      <span className="leader-band-spot-title">{spot.title}</span>
    </div>
  );
}