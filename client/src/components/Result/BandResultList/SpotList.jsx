import { Fragment } from "react";
import SpotListItem from "./SpotListItem";

export default function SpotList (props) {
const { spots } = props;
const mappedSpots = spots.map((spot) => {
  return <SpotListItem spot={spot}/>
})
  return (
    <div>
      {mappedSpots}
    </div>
  );
}