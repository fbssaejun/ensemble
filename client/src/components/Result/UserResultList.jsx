import { useState } from 'react';
import UserResult from './UserResult'


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

  const genArr = filterGenreArr(users)
  const instArr = filterInstArr(users)
  console.log(removeCopy([...genArr, ...instArr]))

  const filtered = removeCopy([...genArr, ...instArr]);
  const rendered = filtered.map((user, index) => {
    return <UserResult key={index} firstName={user.first_name} lastName={user.last_name} username={user.username} />
  })


  return (
    <div>
      {rendered}
    </div>

  );

}