import axios from 'axios';
import { useState, useEffect } from 'react';
import SpotList from './SpotList'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography';
import TestSpotList from './TestSpotList'
import Box from "@mui/material/Box"


export default function BandResult(props) {
  const [spots, setSpots] = useState([]);
  const { bandId } = props;

  //axios get all the spots for this band. Uncomment if you suck
  // and go back to the old ways

  // useEffect(() => {
  //   axios.get(`/api/spots/bands/${bandId}`).then((results) => {
  //     console.log("Spot Information:", results.data)
  //     setSpots(() => [...results.data]);
  //   }).catch((e)=>{console.log("Error Message:", e)})
  // }, [bandId])
  
  return (
    <Card className="single-band-result" sx={{ maxWidth: 400, maxHeight:700 }}>
      <CardContent >
        <CardMedia
          component="img"
          height="140"
          image={
            "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
          }
          />
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Divider variant="middle" />
      {/* <SpotList spots={spots} currentUser={props.currentUser}></SpotList> */}
      <Box  >
        <TestSpotList bandId={bandId} currentUser={props.currentUser} />
      </Box>
      </CardContent>
    </Card>
  );
}