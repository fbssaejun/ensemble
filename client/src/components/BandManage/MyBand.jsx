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


  // const leaveBand = (spotId) => {
  //   axios.delete(`/api/spots/${spotId}`).then((results) => {
  //     const deletedSpot = results.data.result.rows[0];
  //     const newBands = cachedBands.filter((band) => band.id !== deletedSpot.band_id)
  //     setCachedBands((prev) => [...newBands])
  //   })
  // }

  const leaveBand = (spotId) => {
    axios.patch(`/api/spots/${spotId}`, {userId:currentUser.id}).then((results) => {
      const deletedSpot = results.data.result.rows[0];
      const newBands = cachedBands.filter((band) => band.id !== deletedSpot.band_id)
      setCachedBands((prev) => [...newBands])
    })
  }

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