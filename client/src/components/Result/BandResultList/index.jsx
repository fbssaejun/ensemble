import { useState, useEffect } from 'react';
import BandResult from './BandResult';
import Grid from '@mui/material/Grid';


export default function BandResultList(props) {
  const { genre, instrument, bands, checkAvailable } = props;


  const filterGenreArr = (bandArr) => {

    if(genre === "0") {
      return bandArr;
    }

    const retArr = [];

    for(const band of bandArr) {

      if (band.genre_id === Number(genre)) {
        retArr.push(band)
      }

    }

    return retArr;
  }

  const filterInstArr = (bandArr) => {

    if(instrument === "0") {
      return bandArr;
    }

    const retArr = [];

    for(const band of bandArr) {

      if (band.spot_instrument === Number(instrument)) {
        retArr.push(band)
      }
    }
    return retArr;
  }

  const filterAvailable = (bandArr) => {

    if(!checkAvailable) {
      return bandArr
    }

    const retArr = [];

    for(const band of bandArr) {

      if(band.spot_user_id === null) {
        retArr.push(band)
      }
    }

    return retArr;

  };

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

      const available = filterAvailable(arr)
      const filtered = removeCopy(available);
      const rendered = filtered.map((band, index) => {

        return (<Grid align="center" item xs={6}>
          <BandResult key={index} name={band.name} bandId={band.id} currentUser={props.currentUser} />
        </Grid>)
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

      const available = filterAvailable([...arr1, ...arr2]);
      const filtered = removeCopy(available);
      const rendered = filtered.map((band, index) => {
        return (<Grid align="center" >
          <BandResult key={index} name={band.name} bandId={band.id} currentUser={props.currentUser} />
        </Grid>)
      })

      return rendered
    }

  }

  const stuff = resultRender(bands)

  return (
    <Grid container justify="center" alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {stuff}
    </ Grid>
  );
}