import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import SpotListItem from "./SpotListItem"


export default function SpotList (props) {
  const [spots, setSpots] = useState([]);
  const { bandId } = props;

  useEffect(() => {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      console.log("Spot Information:", results.data)
      setSpots(() => [...results.data]);
    }).catch((e)=>{console.log("Error Message:", e)})
  }, [bandId])


  const mappedSpots = spots.map((spot, index) => {
    return <SpotListItem
      key={index}
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