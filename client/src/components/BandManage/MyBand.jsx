import { Fragment, useEffect, useState } from 'react';
import SpotList from './SpotList';
import axios from 'axios';


export default function MyBand(props) {
  const [spots, setSpots] = useState([]);
  const { name, description, image, bandId, currentUser } = props;

  useEffect(()=> {
    axios.get(`/api/spots/bands/${bandId}`).then((results) => {
      setSpots(results.data)
    })
  }, [])

  return (
    <Fragment>
      <h2>{name}</h2>
      <h2>{description}</h2>
      <SpotList currentUser={currentUser} spots={spots}/>

    </Fragment>
    
  )
}
