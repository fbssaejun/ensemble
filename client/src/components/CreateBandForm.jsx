import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FormSpot from "./FormSpot";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./CreateBandForm.scss";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function CreateBandForm(props) {
  // Options for instruments and genres in our db:
  const [allInst, setAllInst] = useState([]);
  const [allGenre, setAllGenre] = useState([]);
  const [bandGenre, setBandGenre] = useState([]);

  // Leader's instrument:
  const [selectedInstLeader, setSelectedInstLeader] = useState("0");

  const [bandName, setBandName] = useState("");
  const [bandDesc, setBandDesc] = useState("");
  const [bandFeatured, setBandFeatured] = useState(false);
  const [bandImage, setBandImage] = useState("");
  const [spotArr, setSpotArr] = useState([]);
  const [leaderSpot, setLeaderSpot] = useState({
    title: "",
    username: props.currentUser.username,
    instrumentId: "",
    description: "",
  });

  const history = useHistory();

  useEffect(() => {
    Promise.all([axios.get("/api/instruments"), axios.get("/api/genres")]).then(
      (all) => {
        const inst = all[0].data;
        const genre = all[1].data;

        setAllInst([...inst]);
        setAllGenre([...genre]);
      }
    );
  }, []);

  const submitForm = (event) => {
    event.preventDefault();

    const withLeaderSpot = [...spotArr, leaderSpot];

    axios
      .post("/api/bands/new", {
        leader_id: props.currentUser.id,
        name: bandName,
        description: bandDesc,
        band_image: bandImage,
        featured: bandFeatured,
        band_genre: bandGenre,
        spotData: spotConvert(withLeaderSpot),
      })
      .then((response) => {
        const newBandId = response.data.result.band_id;
        history.push(`/bands/${newBandId}`);
      })
      .catch((e) => console.log(e));
  };

  const spotConvert = (arr) => {
    const retObj = {
      title: [],
      username: [],
      instrumentId: [],
      description: [],
    };
    arr.forEach((spot) => {
      retObj.title.push(spot.title);
      retObj.username.push(spot.username);
      retObj.instrumentId.push(spot.instrumentId);
      retObj.description.push(spot.description);
    });
    return retObj;
  };

  const addSpot = () => {
    setSpotArr((prev) => [
      ...prev,
      { title: "", username: "", instrumentId: "", description: "" },
    ]);
  };

  const updateSpot = (index, changedSpot) => {
    const newSpots = [...spotArr];
    newSpots.splice(index, 1, changedSpot);
    setSpotArr((prev) => [...newSpots]);
  };

  const deleteSpot = (index) => {
    const newSpots = [...spotArr];
    newSpots.splice(index, 1);
    setSpotArr((prev) => [...newSpots]);
  };

  const materialsInst = allInst.map((instrument) => {
    return (
      <MenuItem key={instrument.id} value={instrument.id}>
        {instrument.name}
      </MenuItem>
    );
  });

  return (
    <div className="create-band-form">
      <form onSubmit={submitForm}>
        <div className="form-group-band">
          <h2>Create a new Band</h2>
          <div class="form__group field">
            <label for="name" class="form__label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name of band"
              class="form__field"
              name="name"
              id="name"
              onChange={({ target }) => setBandName(target.value)}
              required
            />
          </div>
          <br />
          <div class="form__group field">
            <label for="description" class="form__label">
              Description
            </label>
            <input
              type="text"
              class="form__field"
              name="description"
              id="description"
              placeholder="Enter a band description"
              onChange={({ target }) => setBandDesc(target.value)}
            />
          </div>
          <br />
          <div class="form__group field">
            <label for="band_image" class="form__label">
              Band Image URL
            </label>
            <input
              type="text"
              placeholder="Link to picture"
              type="text"
              class="form__field"
              name="band_image"
              id="band_image"
              onChange={({ target }) => setBandImage(target.value)}
            />
          </div>
          <br />
          <Autocomplete
            multiple
            onChange={(event, value) => setBandGenre(value)}
            id="tags-outlined"
            options={allGenre}
            getOptionLabel={(option) => option.name}
            Genres
            renderInput={(params) => (
              <TextField
                {...params}
                label="Genres"
                placeholder="Add More Genres"
              />
            )}
          />
          <br />
          <label htmlFor="check">
            Would you like to feature your band?
          </label>

            <div id="container">
              <input type="checkbox" name="check" checked={bandFeatured} onChange={() => setBandFeatured(!bandFeatured)}/>
              <label for="check"><div></div></label>
            </div>

          <h2>Band Leader</h2>
          <div class="form__group field">
            <label for="title" class="form__label">
              Your Title
            </label>
            <input
              type="text"
              placeholder="Your title"
              type="text"
              class="form__field"
              name="title"
              id="title"
              onChange={({ target }) =>
                setLeaderSpot((prev) => ({ ...prev, title: target.value }))
              }
              required
            />
          </div>
          <div class="form__group field">
            <label for="title" class="form__label">
              Description
            </label>
            <input
              type="text"
              placeholder="description"
              type="text"
              class="form__field"
              name="description"
              id="description"
              onChange={({ target }) =>
                setLeaderSpot((prev) => ({
                  ...prev,
                  description: target.value,
                }))
              }
              required
            />
          </div>
          <br />
          <FormControl className="select-instrument" required>
            <InputLabel id="leader-instrument-label">Instrument</InputLabel>
            <Select
              labelId="leader-instrument-label"
              id="leader-instrument"
              value={leaderSpot.instrumentId}
              label="Instrument"
              onChange={({ target }) =>
                setLeaderSpot((prev) => ({
                  ...prev,
                  instrumentId: target.value,
                }))
              }
            >
              {materialsInst}
            </Select>
          {spotArr.map((obj, index) => {
            return (
              <FormSpot
                key={index}
                onDelete={() => {
                  deleteSpot(index);
                }}
                onUpdate={updateSpot}
                index={index}
                spot={obj}
              />
            );
          })}
          </FormControl>
          <div className="submit-button">
            <button
              class="btn draw-border"
              type="button"
              onClick={() => addSpot()}
            >
              Add A Spot
            </button>
            <button class="btn draw-border" type="submit">
              Create band
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
