import axios from 'axios';
import { useState, useEffect } from 'react';
import SpotList from './SpotList'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



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
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
      <SpotList spots={spots} currentUser={props.currentUser}></SpotList>
      </CardContent>
    </Card>
  );
}