import { useParams } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import "./Band.scss"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import FilledSpots from './FilledSpots';
import OpenSpots from './OpenSpots';

export default function Band (props) {
  const { bandId } = useParams();
  const { currentUser } = props;
  const [band, setBand] = useState({});
  const [spots, setSpots] = useState([]);
  const [bandGenre, setBandGenre] = useState([]);

  useEffect(() => {

    Promise.all([
      axios.get(`/api/bands/${bandId}`),
      axios.get(`/api/spots/bands/${bandId}`),
      axios.get(`/api/genres/bands/${bandId}`)
    ]).then((all) => {

      setBand(all[0].data[0]);
      setSpots(all[1].data);
      setBandGenre(all[2].data);

    })
  }, [])

  console.log(spots)

  const genreTags = bandGenre.map((obj) => {
    return <Chip label={obj.name} />
  })


  const sortSpot = (spotArr) => {
    const retObj = {
      filled:[],
      open:[]
    }
    for (const spot of spotArr) {
      if(spot.user_id === null) {
        retObj.open.push(spot);
      } else {
        retObj.filled.push(spot);
      }
    }
    return retObj;
  };

  (sortSpot(spots))

  return (
    <div className="band-page-main">

      <div id="wallpaper-image-band"></div>
      <div className="band-profile-content">
        <h1 className="band-page-title">{band.name}</h1>
        <Stack direction="row" spacing={1}>
          {genreTags}
        </Stack>
        <h4>{band.description}</h4>
      </div>

      <div className="spots">

          <div className="filled-spots">
            <h5>Current Members</h5>
            <FilledSpots filledSpots={sortSpot(spots).filled} />
          </div>

          <div className="open-spots">
            <h5>Open spots</h5>
            <OpenSpots currentUser={currentUser} openSpots={sortSpot(spots).open} />
          </div>

      </div>

    </div>
  ) 

}


 // const getSpots = (spots) => {
  //   const spotsArr = []
  //   for(const spot of spots) {
  //     if (spot.band_id === Number(bandId)) {
  //       spotsArr.push(spot);
  //     }
  //   }
  //   return spotsArr;
  // }

  // const filledSpots = getSpots(spots);
  // const bandSpots = filledSpots.map(spot => { 
  //   return <Spot key={spot.id} title={spot.title} />
  // });