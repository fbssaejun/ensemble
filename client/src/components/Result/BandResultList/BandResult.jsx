import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography';
import SpotList from './SpotList'
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton";


export default function BandResult(props) {
  const [band, setBand] = useState({});
  const { bandId } = props;

  const history = useHistory();

  //axios get all the spots for this band. Uncomment if you suck
  // and go back to the old ways

  useEffect(() => {
    axios.get(`/api/bands/${bandId}`)
    .then((results) => {
      // console.log("Band Information:", results)
      setBand((prev) =>  results.data[0]);
    }).catch((e)=>{console.log("Error Message:", e)})
  }, [bandId])
  
  const stockImage = "https://media.istockphoto.com/vectors/fiddler-vector-id452097777?k=20&m=452097777&s=612x612&w=0&h=tEiPg3SQNeclfnvT24V7NFusHxe0291xOKZPBg1Sq-8=";

  const buttonBehavior = () => {
    history.push(`/bands/${bandId}`)
  };

  return (
    <Card className="single-band-result" sx={{ maxWidth: 400, maxHeight:700 }}>
      <CardContent >
        <IconButton onClick={() => buttonBehavior()}>
        <CardMedia
          component="img"
          height="140"
          image={band.band_image ? band.band_image : stockImage }
          />
        </IconButton>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Divider variant="middle" />
      <Box>
        <SpotList bandId={bandId} currentUser={props.currentUser} />
      </Box>
      </CardContent>
    </Card>
  );
}