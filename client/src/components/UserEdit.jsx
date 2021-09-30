import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom'


export default function Navbar(props) {
  const { userId } = useParams();
  const [userInst, setUserInst] = useState();
  const [userGenre, setUserGenre] = useState();

  useEffect(() => {

    axios.get(`/api/users/${userId}/edit`)
    .then(results => {
      setUserInst([...results.data.instResult])
      setUserGenre([...results.data.genreResult])
    })


  },[]);

  return (
    <Fragment>
      <h1> Abot You </h1>
      <h3>{JSON.stringify(userInst)}</h3>
      <h3>{JSON.stringify(userGenre)}</h3>
    </Fragment>

  );


}