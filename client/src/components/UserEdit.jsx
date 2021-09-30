import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Navbar(props) {
  const { userId } = useParams();
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

      // Don't need to convert inst or genre because Autocomplete component
      // from MUI takes objects for their options.
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

  return (
    <Fragment>
      <h1> Abot You </h1>
      <h3>{JSON.stringify(userInst)}</h3>
      <h5>{JSON.stringify(allInst)}</h5>

      <h3>{JSON.stringify(userGenre)}</h3>
      <h5>{JSON.stringify(allGenre)}</h5>
      {allInst && <Autocomplete
        multiple
        id="tags-outlined"
        options={allInst}
        getOptionLabel={(option) => option.name}
        defaultValue={preSelected(userInst, allInst)}
        Instruments
        renderInput={(params) => (
          <TextField
            {...params}
            label="Instruments"
            placeholder="Add More Instruments"
          />
        )}
      />} <br />
      {allGenre && <Autocomplete
        multiple
        id="tags-outlined"
        options={allGenre}
        getOptionLabel={(option) => option.name}
        defaultValue={preSelected(userGenre, allGenre)}
        Instruments
        renderInput={(params) => (
          <TextField
            {...params}
            label="Instruments"
            placeholder="Add More Instruments"
          />
        )}
      />}
    </Fragment>

  );


}