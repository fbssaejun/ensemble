import { Fragment } from "react";
import SpotListItem from "./SpotListItem";

export default function SpotList (props) {
  const { spots } = props;

  const mappedSpots = spots.map((spot) => {
    return <SpotListItem spot={spot} currentUser={props.currentUser}/>
  })


  return (
    <div>
      {mappedSpots}
    </div>
  );
}