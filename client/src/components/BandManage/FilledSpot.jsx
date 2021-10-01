import { Fragment } from "react"
import axios from "axios";

export default function FilledSpot(props) {
  const { spots, spot, setSpots, currentUser } = props;

  const deleteSpot = (spotId) => {
    axios.delete(`/api/spots/${spotId}`).then((results) => {
      const newSpots = spots.filter((spot) => spot.id !== results.data.result.rows[0].id)
      console.log("results", results)
      console.log("newspots:", newSpots)
      setSpots((prev) => [...newSpots])
    })
  }
  
  return (
    <Fragment>
      <h1>User: {spot.user_id}</h1>
      {currentUser.id !== spot.user_id && <button onClick={(event)=>{
        event.preventDefault();
        deleteSpot(spot.id)}}> x </button>}
    </Fragment>
  );
}