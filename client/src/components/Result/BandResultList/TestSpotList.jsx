import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import TestSpotListItem from "./TestSpotListItem"

export default function SpotList (props) {
  const [spots, setSpots] = useState([]);
  const { bandId } = props;

  useEffect(() => {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      console.log("Spot Information:", results.data)
      setSpots(() => [...results.data]);
    }).catch((e)=>{console.log("Error Message:", e)})
  }, [bandId])


  const mappedSpots = spots.map((spot) => {
    return <TestSpotListItem
      spot={spot}
      currentUser={props.currentUser}
    />
  })

  return (
    <div>
      {mappedSpots}
    </div>
  );
}