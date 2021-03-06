import MyBand from "./MyBand";
import { Fragment, useEffect, useState } from "react";
import axios from 'axios';

export default function MyBandList (props) {
  const [myBands, setMyBands] = useState([]);
  const [partBands, setPartBands] = useState([]);
  const { userId } = props 

  const ownerFilter = (bandArr) => {
    
    const retObj = {
      my:[],
      part:[]
    }

    for (const band of bandArr) {
      if(band.leader_id === Number(userId)){
        retObj.my.push(band)
      } else {
        retObj.part.push(band)
      }
    }

    return retObj
  }

  useEffect(() => {
    // // Thing that I'm trying to do
    // axios.get(`/api/bands/users/${userId}`)
    // .then((results)=> {
    //   const userBandInfo = ownerFilter(results.data);
    //   setMyBands(() => [...userBandInfo.my])
    //   setPartBands(() => [...userBandInfo.part])
    // })

    // Thing that works for just leader bands
    axios.get(`/api/bands/leader-bands/${userId}`).then((results) => {
      setMyBands(() => [...results.data])
    })
  }, [])
  

  // const deleteBand = (bandId) => {
  //   axios.delete(`/api/bands/${bandId}`).then((results) => {
  //     const newBands = myBands.filter((band) => band.id !== results.data.result.rows[0].id)
  //     setMyBands(() => [...newBands])
  //   });
  // }
  
  const bandArr = myBands.map((band) => {
    return <MyBand key={band.id} id={band.id} name={band.name} image={band.band_image} description={band.description}/>
  })

  return (
  <div>
    {myBands.length ?
    <div className="profile-band-container">
      {bandArr}
    </div>
    :
    <p className="profile-desc">You don't have any related bands</p>
    }
  </div>
    )
  }
