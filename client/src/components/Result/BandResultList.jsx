import { useState, useEffect } from 'react';
import BandResult from './BandResult';


export default function BandResultList(props) {
  const { genre, instrument } = props;
  const [bands, setBands] = useState(props.bands);

  console.log("stuff", props.bands)
  console.log("before every filter", bands)

  useEffect(() => {
    console.log("USE EFFECT TRIGGERED");
    if(genre > 0) {
      const genreFiltBands = bands.filter((band) => Number(band.genre_id) === Number(genre))
      setBands(() => [...genreFiltBands])
    }

    if(instrument > 0) {
      const instFiltBands = bands.filter((band) => Number(band.spot_instrument) === Number(instrument))
      setBands(() => [...instFiltBands])
    }

  },[genre, instrument])

  
  console.log("after genre filter:", bands)

  console.log("after instrument filter:", bands)

  const removeCopy = (bandArr) => {

    const stored = {};
    for (const band of bandArr) {
      if(!stored[band.id]) {
        stored[band.id] = band;
      }
    }

    console.log("stored", stored)

    return Object.values(stored);

  };

  console.log("remove copy:", removeCopy(bands))

  // const resultsMapped = removeCopy(bands).map((band) => {
  //   return band;
  // })

  return (
    <div>
    </div>
  );
}