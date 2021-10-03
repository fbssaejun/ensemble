import MyBand from "./MyBand";

/* eslint-disable no-unused-vars */
export default function MyBandList(props) {
  const { bands, currentUser, cachedBands, setCachedBands } = props;

  const myBands = cachedBands.filter((band) => {
    return band.leader_id !== currentUser.id;
  })

  const myBandArr = myBands.map(band => {
    return <MyBand 
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
    <div>
      <h1>My Bands</h1>
      {myBandArr}
    </div>
  )
}