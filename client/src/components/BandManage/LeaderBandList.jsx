import LeaderBand from './LeaderBand';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

export default function LeaderBandList (props) {
  const { bands, currentUser, cachedBands, setCachedBands } = props;
  console.log("inside my band list", cachedBands);
  // const [spots, setSpots] = useState([]); 

  // useEffect(() => {

  //   axios.get(`/api/spots/users/${currentUser.id}`).then((results) => {
  //     console.log("This is the result from MYBANDLIST API CALL", results)
  //     setSpots(results.data)
  //   })
  // }, [])
  
  // console.log("AFTER SETSPOTS", spots)

  //map myband components
  const myBandArr = bands.map(band => {
    return <LeaderBand cachedBands={cachedBands} setCachedBands={setCachedBands} bandId={band.id} name={band.name} description={band.description} image={band.band_image} currentUser={currentUser} featured={band.featured}/>
  })


  return (
    <Fragment>
      <h1>BANDS OWNED</h1>
      {myBandArr}
    </Fragment>
  )
}