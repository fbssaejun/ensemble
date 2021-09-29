import { Fragment } from "react";
 
export default function SpotListItem (props) {
  const { spot } = props;
    return (
      <Fragment>
      {!spot.user_id ? (<div>
        <h5>{spot.title}</h5>
        <h5>"Empty Spot"</h5>
        <h5>{spot.band_id}</h5>
        <button> + </button>
      </div>) : (
        <div>
        <h5>{spot.title}</h5>
        <h5>{spot.user_id}</h5>
        <h5>{spot.band_id}</h5> 
      </div>
      )}
      </Fragment>
    );
  }