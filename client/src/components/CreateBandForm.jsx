import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormSpot from './FormSpot';

export default function CreateBandForm(props) {
  const [bandName, setBandName] = useState("");
  const [bandDesc, setBandDesc] = useState("");
  const [bandFeatured, setBandFeatured] = useState(false);
  const [bandImage, setBandImage] = useState("");
  const [spotArr, setSpotArr] = useState([]);
  const history = useHistory();

  const submitForm = (event) => {
    event.preventDefault();

    axios.post('/bands/new', {
      leader_id: props.currentUser,
      name: bandName,
      description: bandDesc,
      band_image: bandImage,
      featured: bandFeatured,
      spotData: spotConvert(spotArr)
    })
    .then(response => {
      const newBandId = response.data.result.band_id;
      history.push(`/bands/${newBandId}`)
    }).catch(e => console.log(e))
  }

  const spotConvert = (arr) => {
    const retObj = {title:[], username: [], instrumentId: [], description: []};
    arr.forEach((spot) => {
      retObj.title.push(spot.title);
      retObj.username.push(spot.username);
      retObj.instrumentId.push(spot.instrumentId);
      retObj.description.push(spot.description);
    })
    return retObj;
  }

  const addSpot = () => {
    setSpotArr((prev) => [...prev, {title:"", username:"", instrumentId:"", description:""}]);
  };

  const updateSpot = (index, changedSpot) => {
    const newSpots = [...spotArr]
    newSpots.splice(index, 1, changedSpot);
    setSpotArr((prev) => [...newSpots]);
  };

  const deleteSpot = (index) => {
    const newSpots = [...spotArr];
    newSpots.splice(index, 1);
    setSpotArr((prev) => [...newSpots]);
  };

  return(
    <form onSubmit={submitForm}>
      <h2>{JSON.stringify(spotConvert(spotArr))}</h2>
      <div className="form-group-band">
        <h2>Create a new Band</h2>
        <input type="text" placeholder="Enter name of band" onChange={({ target }) => setBandName(target.value)}/> <br/>
        <textarea rows="10" cols="50" type="text" placeholder="Enter a band description" onChange={({ target }) => setBandDesc(target.value)}/> <br/>        
        <input type="text" placeholder="Link to picture" onChange={({ target }) => setBandImage(target.value)}/> <br/>
        <input type="checkbox" checked={bandFeatured} id="featuredCheck" onChange={() => setBandFeatured(!bandFeatured)}/>
        <label for="featuredCheck">Feature Band?</label> <br />
        {spotArr.map((obj, index) => {
          return <FormSpot key={index} onDelete={() => {deleteSpot(index)}} onUpdate={updateSpot} index={index} spot={obj} />
        })}
        <button type="button" onClick={() => addSpot()}>Add A Spot</button>
        <button type="submit">Create band</button>
      </div>
    </form>
  );

}