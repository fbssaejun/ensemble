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
  

  const resultRender = (arr) => {

    if (genre === "0" && instrument === "0") {

      const filtered = removeCopy(arr);
      const rendered = filtered.map((band, index) => {

        return <BandResult key={index} name={band.name} bandId={band.id}/>
      })
      return rendered

    } else {
      
      const arr1 = filterGenreArr(filterInstArr(arr))
      const arr2 = filterInstArr(filterGenreArr(arr))

      if (arr1.length === 0) {
        return [];
      }

      if (arr2.length === 0) {
        return [];
      }

      const filtered = removeCopy([...arr1, ...arr2]);
      const rendered = filtered.map((band, index) => {
        return <BandResult key={index} name={band.name} bandId={band.id} />
      })

      return rendered
    }

  }
  

  const stuff = resultRender(bands)

  return (
    <div>
      {stuff}
    </div>
  );
}