import MyBand from './MyBand';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

export default function MyBandList (props) {
  const { bands, currentUser } = props;
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
    return <MyBand bandId={band.id} name={band.name} description={band.description} image={band.band_image} currentUser={currentUser} />
  })


  return (
    <Fragment>
      <h1>This Is The Band I Own</h1>
      {myBandArr}
    </Fragment>
  )
}