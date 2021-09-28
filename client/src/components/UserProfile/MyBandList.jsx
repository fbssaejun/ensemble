import MyBand from "./MyBand";
import { Fragment, useEffect, useState } from "react";
import axios from 'axios';

export default function MyBandList (props) {
  const [bands, setBands] = useState([])
  const { userId } = props 

  useEffect(() => {
    axios.get(`/api/bands/leader-bands/${userId}`).then((results) => {
      setBands(() => [...results.data])
    })
  }, [])
  
  const deleteBand = (bandId) => {
    axios.delete(`/api/bands/${bandId}`).then((results) => {
      const newBands = bands.filter((band) => band.id !== results.data.result.rows[0].id)
      setBands(() => [...newBands])
    });
  }
  
  const bandArr = bands.map((band) => {
    return <MyBand key={band.id} onDelete={() => deleteBand(band.id)} name={band.name}/>
  })

  return (
    <Fragment>
      {bandArr}
    </Fragment>
    )
  }
