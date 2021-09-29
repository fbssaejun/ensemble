import { useState, useEffect } from 'react';
import BandResult from './BandResult';


export default function BandResultList(props) {
  const { genre, instrument, bands } = props;


  const filterGenreArr = (bandArr) => {
    
    if (genre === "0") {
      return bandArr;
    }

    const retArr = [];

    for (const band of bandArr) {

      if (band.genre_id === Number(genre)) {
        retArr.push(band)
      }

    }
    return retArr;
  }

  const filterInstArr = (bandArr) => {

    if (instrument === "0") {
      return bandArr;
    }

    const retArr = [];

    for (const band of bandArr) {

      if (band.spot_instrument === Number(instrument)) {
        retArr.push(band)
      }
    }
    return retArr;
  }

  const removeCopy = (bandArr) => {

    const stored = {};
    for (const band of bandArr) {
      if(!stored[band.id]) {
        stored[band.id] = band;
      }
    }
    return Object.values(stored);
  };
  

  const genArr = filterGenreArr(bands)
  const instArr = filterInstArr(bands)
  console.log(removeCopy([...genArr, ...instArr]))

  const filtered = removeCopy([...genArr, ...instArr]);
  const rendered = filtered.map((band, index) => {
    return <BandResult key={index} name={band.name} />
  })


  return (
    <div>
      {rendered}
    </div>
  );
}