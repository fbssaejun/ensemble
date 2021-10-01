import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBand(props) {
  const [spots, setSpots] = useState([]);
  const { name, description, image, bandId, currentUser, featured, cachedBands, setCachedBands } = props;

  useEffect(()=> {
    axios.get(`/api/spots/users/${currentUser.id}`).then((results) => {
      setSpots(results.data);
    })
  }, [])

  const mySpot = spots.filter((spot) => {
    return spot.band_id === bandId;
  })

  console.log("my bands", cachedBands)

  const leaveBand = (spotId) => {
    axios.delete(`/api/spots/${spotId}`).then((results) => {
      const deletedSpot = results.data.result.rows[0];
      console.log("deleted spot:", deletedSpot)
      const newBands = cachedBands.filter((band) => band.id !== deletedSpot.band_id)
      setCachedBands((prev) => [...newBands])
    })
  }

  console.log("find spot for my band:", mySpot, bandId);
  return (
    <div>
      <h2>Band Name: {name}</h2>
      {mySpot.length && <h3>My Spot: {mySpot[0].instrument_name}</h3>}
      <button type="button" onClick={(event)=>{
        event.preventDefault();
        leaveBand(mySpot[0].id)
      }}>Leave Band</button>
    </div>
  )

}