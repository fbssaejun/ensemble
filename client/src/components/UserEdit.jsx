import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function Navbar(props) {
  const { userId } = useParams();

  // defaultInst and defaultGenre is to get initial user
  // genre and instrument info
  const [defaultInst, setDefaultInst] = useState();
  const [defaultGenre, setDefaultGenre] = useState();

  // userInst and userGenre are to obtain the input information
  // from Autocomplete component
  const [userInst, setUserInst] = useState();
  const [userGenre, setUserGenre] = useState();
  const [allInst, setAllInst] = useState();
  const [allGenre, setAllGenre] = useState();

  
  useEffect(() => {

    Promise.all([
      axios.get(`/api/users/${userId}/edit`),
      axios.get('/api/instruments'),
      axios.get('/api/genres')
    ])
    .then((all) => {
      const userInfo = all[0].data;
      const inst = all[1].data;
      const genre = all[2].data;

      setUserInst([...userInfo.instResult]);
      setUserGenre([...userInfo.genreResult]);

      setDefaultInst([...userInfo.instResult]);
      setDefaultGenre([...userInfo.genreResult]);

      setAllInst([...inst]);
      setAllGenre([...genre]);


    })

  },[]);

  const preSelected = (userOptions, allOptions) => {
    const retArr = [];

    // First, take the userOptions array (which is an
    // array of objects with id and name of item)
    // and convert it to an object with id as the key.

    const userOptionsObj = userOptions.reduce(
    (obj, item) => Object.assign(obj, { [item.id]: item.name }), {});

    
    // Then, use for loop to check which of allOptions is already
    // in the userOptionsObj by looking for the id value.

    for (const item of allOptions) {
      if(userOptionsObj[item.id]) {
        retArr.push(item)
      }
    }

    return retArr;

  };

  const submitOptions = (event) => {
    event.preventDefault();
    console.log(userInst);
    console.log(userGenre);

  }

  return (
    <Fragment>
      <h1> Abot You </h1>
      <br />
        <form onSubmit={submitOptions}>
          <Stack spacing={2} sx={{ width: 500 }}>
          <h3> Your Instruments </h3>
          {allInst && <Autocomplete
            multiple
            onChange={(event, value) => setUserInst(value)}
            id="tags-outlined"
            options={allInst}
            getOptionLabel={(option) => option.name}
            defaultValue={preSelected(defaultInst, allInst)}
            Instruments
            renderInput={(params) => (
              <TextField
                {...params}
                label="Instruments"
                placeholder="Add More Instruments"
              />
            )}
          />} 
          <h3> Your Genres </h3>
          {allGenre && <Autocomplete
            multiple
            onChange={(event, value) => setUserGenre(value)}
            id="tags-outlined"
            options={allGenre}
            getOptionLabel={(option) => option.name}
            defaultValue={preSelected(defaultGenre, allGenre)}
            Genres
            renderInput={(params) => (
              <TextField
                {...params}
                label="Genres"
                placeholder="Add More Genres"
              />
            )}
          />}
          </Stack>
          <button>Submit Me!</button>
        </form>
    </Fragment>

  );


}