import axios from 'axios';
import { useState, useEffect } from 'react';
import SpotList from './SpotList'
import Card from '@mui/material/Card';



export default function BandResult(props) {
  const [spots, setSpots] = useState([]);
  const { bandId } = props;

  //axios get all the spots for this band
  useEffect(() => {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      console.log("Spot Information:", results.data)
      setSpots(() => [...results.data]);
    }).catch((e)=>{console.log("Error Message:", e)})
  }, [bandId])
 

  
  return (
    <Card className="single-band-result" sx={{ maxWidth: 400, maxHeight:300 }}>
      <h1>{props.name}</h1>
      <SpotList spots={spots} currentUser={props.currentUser}></SpotList>
    </Card>
  );
}