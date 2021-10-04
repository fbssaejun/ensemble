import MyBand from "./MyBand";
import NewMyBand from './NewMyBand'
import './MyBandList.scss';

/* eslint-disable no-unused-vars */
export default function MyBandList(props) {
  const { bands, currentUser, cachedBands, setCachedBands } = props;

  const myBands = cachedBands.filter((band) => {
    return band.leader_id !== currentUser.id;
  })

  console.log(cachedBands)

  const myBandArr = myBands.map(band => {
    return <NewMyBand 
      key={band.id}
      cachedBands={cachedBands}
      setCachedBands={setCachedBands}
      bandId={band.id}
      name={band.name}
      description={band.description}
      image={band.band_image}
      currentUser={currentUser}
      bandImage={band.band_image}
      featured={band.featured}
    />
  })

  return (
    <div className="my-band-list">
      <h1>The Bands You Joined</h1>
      <div className="my-band-list-container">
        {myBandArr}
      </div>
    </div>
  )
}