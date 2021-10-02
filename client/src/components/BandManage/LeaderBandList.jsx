/* eslint-disable no-unused-vars */
import LeaderBand from './LeaderBand';
import { Fragment } from 'react';

export default function LeaderBandList (props) {
  const { currentUser, cachedBands, setCachedBands } = props;

  const leaderBands = cachedBands.filter((band) => {
    return band.leader_id === currentUser.id;
  })

  //map myband components
  const myBandArr = leaderBands.map(band => {
    return <LeaderBand 
      key={band.id} 
      cachedBands={cachedBands} 
      setCachedBands={setCachedBands} 
      bandId={band.id} 
      name={band.name} 
      description={band.description} 
      image={band.band_image} 
      currentUser={currentUser} 
      featured={band.featured}
    />
  })


  return (
    <Fragment>
      <h1>BANDS OWNED</h1>
      {myBandArr}
    </Fragment>
  )
}