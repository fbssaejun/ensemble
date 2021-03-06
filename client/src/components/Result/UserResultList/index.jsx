import { useState } from 'react';
import UserResult from './UserResult'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

export default function UserResultList(props) {
  const { genre, instrument, users } = props;

  const filterGenreArr = (userArr) => {
    
    if (genre === "0") {
      return userArr;
    }

    const retArr = [];

    for (const user of userArr) {

      if (user.genre_id === Number(genre)) {
        retArr.push(user)
      }

    }
    return retArr;
  }

  const filterInstArr = (userArr) => {

    if (instrument === "0") {
      return userArr;
    }

    const retArr = [];

    for (const user of userArr) {

      if (user.instrument_id === Number(instrument)) {
        retArr.push(user)
      }
    }
    return retArr;
  }

  const removeCopy = (userArr) => {

    const stored = {};
    for (const user of userArr) {
      if(!stored[user.id]) {
        stored[user.id] = user;
      }
    }
    return Object.values(stored);
  };


  const doubleFilter = (userArr) => {

    const storedInst = {};
    const storedGenre = {};

    const retArr = []

    for (const user of userArr) {

      if (user.instrument_id === Number(instrument)) {
        storedInst[user.id] = user;
      }

      if (user.genre_id === Number(genre)) {
        storedGenre[user.id] = user;
      }

    }

    for (const user of userArr) {
      if (storedInst[user.id] && storedGenre[user.id]){
        retArr.push(user)
      }
    }

    return retArr;
  }


  console.log("What we got before filter", users);

  const resultRender = (arr) => {

    if (genre === "0" && instrument === "0") {

      const filtered = removeCopy(arr);

      let boxSize = (filtered.length === 1) ? 12 : 4;
      boxSize = (filtered.length === 2) ? 6 : boxSize;

      return filtered.map((user, index) => {
        return (<Grid align="center" item xs={boxSize}>
        <UserResult
          key={index}
          userId={user.id}
          firstName={user.first_name}
          lastName={user.last_name}
          username={user.username}
          profile_image={user.profile_image}/>
        </Grid>)
      })

    }
     else if ((genre !== "0" && instrument !== "0")) {

      const filtered = removeCopy(doubleFilter(arr));

      let boxSize = (filtered.length === 1) ? 12 : 4;
      boxSize = (filtered.length === 2) ? 6 : boxSize;

      return filtered.map((user, index) => {
        return (<Grid align="center" item xs={boxSize}>
          <UserResult 
            key={index}
            userId={user.id}
            firstName={user.first_name}
            lastName={user.last_name}
            username={user.username}
            profile_image={user.profile_image}/>
          </Grid>)
      })

    }
    else {
      
      const arr1 = filterGenreArr(filterInstArr(arr));
      const arr2 = filterInstArr(filterGenreArr(arr));
      console.log("Filtered Arr 1", arr1)
      console.log("Filtered Arr 2", arr2)

      const filtered = removeCopy([...arr1, ...arr2]);

      let boxSize = (filtered.length === 1) ? 12 : 4;
      boxSize = (filtered.length === 2) ? 6 : boxSize;

      return filtered.map((user, index) => {
        return (<Grid align="center" item xs={boxSize}>
          <UserResult
            key={index}
            userId={user.id}
            firstName={user.first_name}
            lastName={user.last_name}
            username={user.username}
            profile_image={user.profile_image}/>
          </Grid>)
      })

    }
  }
  

  const userSearchContent = resultRender(users)

  return (
    <Box m={2} pt={3}>
      <Grid container justify="center" alignItems="center" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {userSearchContent}
      </Grid>
    </Box>

  );

}