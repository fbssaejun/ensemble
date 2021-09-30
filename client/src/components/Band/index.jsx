import { useParams } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import Spot from './Spot'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Band (props) {
  const { bandId } = useParams();
  const [band, setBand] = useState({})
  const [spots, setSpots] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get(`/api/bands/${bandId}`),
      axios.get("/api/spots")
    ]).then((all) => {
      setBand(all[0].data[0]);
      setSpots(all[1].data);
    })
  }, [])

  const getSpots = (spots) => {
    const spotsArr = []
    for(const spot of spots) {
      if (spot.band_id === Number(bandId)) {
        spotsArr.push(spot);
      }
    }
    return spotsArr;
  }

  const filledSpots = getSpots(spots);
  const bandSpots = filledSpots.map(spot => { 
    return <Spot title={spot.title} />
  });

  // Checks that API data has loaded correctly
  const dataReady = (band, bandSpots) => {
    // Check band is an object, not null
    // Check bandSpot array is filled
    return band && (bandSpots.length !== 0)
  }

  return !dataReady(band, bandSpots) ? (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  ) : (
    <Fragment>
      <h1>{band.name}</h1>
      {bandSpots}
    </Fragment>
  ) 

}