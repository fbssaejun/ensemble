import axios from "axios";
import { useState, Fragment } from "react";

export default function AddSpotItem(props) {
  const { bandId, spots, setSpots } = props;
  const [showSpotForm, setShowSpotForm] = useState(false);
  const [username, setUsername] = useState("")
  const [instrumentId, setInstrumentId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const addSpot = (bandId) => {
    axios.post('/api/spots/new', {bandId: bandId, username: username, instrumentId: instrumentId, title: title, description: description}).then((results) => {
      const newSpot = results.data.result.rows[0]
      setSpots((prev) => [...prev, newSpot])
    })
  }

  return(
    <Fragment>
      <button type="button" onClick={() => setShowSpotForm(!showSpotForm)}>+</button>
      {showSpotForm && (
        <form onSubmit={(event) => {event.preventDefault();
          addSpot(bandId);
          setShowSpotForm(!showSpotForm);
        }}>
          <input type="text" placeholder="Username" value={username} onChange={({target}) => setUsername(target.value)}></input>
          <input type="text" placeholder="instrument" value={instrumentId} onChange={({target}) => setInstrumentId(target.value)}></input>
          <input type="text" placeholder="title" value={title} onChange={({target}) => setTitle(target.value)}></input>
          <input type="text" placeholder="description" value={description} onChange={({target}) => setDescription(target.value)}></input>
          
          <button>Add</button>
        </form>
      )}
    </Fragment>
  )
}