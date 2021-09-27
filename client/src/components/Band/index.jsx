import { useParams } from 'react-router-dom';
import { Fragment } from 'react'
import Spot from './Spot'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Band (props) {
  const { bandId } = useParams();
  const { bands, spots } = props;

  const getBand = (bands) => {
    for(const band of bands) {
      if (band.id === Number(bandId)) {
        return band;
      }
    }
  }

  const getSpots = (spots) => {
    const spotsArr = []
    for(const spot of spots) {
      if (spot.band_id === Number(bandId)) {
        spotsArr.push(spot);
      }
    }
    return spotsArr;
  }

  const band = getBand(bands)
  const filledSpots = getSpots(spots);
  const bandSpots = filledSpots.map(spot => { 
    return <Spot title={spot.description} />
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