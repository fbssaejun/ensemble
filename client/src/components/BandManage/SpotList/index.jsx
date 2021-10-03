import EmptySpot from "./EmptySpot";
import FilledSpot from "./FilledSpot";
import AddSpotItem from "./AddSpotItem";

import './SpotList.scss';

export default function SpotList (props) {
const { spots, setSpots, bandId } = props;
const mappedSpots = spots.map((spot) => {
    return spot.user_id !== null ? (<FilledSpot key={spot.id} spots={spots} spot={spot} setSpots={setSpots} currentUser={props.currentUser}/>) : (<EmptySpot key={spot.id} spots={spots} spot={spot} setSpots={setSpots} currentUser={props.currentUser}/>)
  })


  return (
    <div className="spot-list-container">
      {mappedSpots}
      <AddSpotItem bandId={bandId} spots={spots} setSpots={setSpots} />
    </div>
  );
}