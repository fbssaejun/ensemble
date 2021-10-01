import { Fragment } from "react";
import SpotListItem from "./SpotListItem";
import AddSpotItem from "./AddSpotItem";

export default function SpotList (props) {
const { spots, setSpots, bandId } = props;
const mappedSpots = spots.map((spot) => {
  return <SpotListItem spots={spots} spot={spot} setSpots={setSpots} currentUser={props.currentUser}/>
})
  return (
    <div>
      {mappedSpots}
      <AddSpotItem bandId={bandId} spots={spots} setSpots={setSpots} />
    </div>
  );
}