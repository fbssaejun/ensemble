import { Fragment, useState } from "react";
import { useHistory } from 'react-router-dom';
import ApplicationForm from "../../ApplicationForm";
 
export default function SpotListItem (props) {
  const [showApplication, setShowApplication] = useState(false);
  const [buttonIcon, setButtonIcon] = useState("+")
  const history = useHistory();
  const { spot } = props;
    return (
      <Fragment>
      {!spot.user_id ? (<div>
        <h5>title: {spot.title} filled?: <button onClick={() => {
          if (props.currentUser === undefined) {
            history.push('/auth')
          }
          setShowApplication((prev) => !prev);
          setButtonIcon((prev)=>{
            return (prev === "+") ? "x" : "+" 
        })
      }}> {buttonIcon} </button> band: {spot.band_id}</h5>
        {showApplication && <ApplicationForm spotId={spot.id} currentUser={props.currentUser} onClick={() => {
          setShowApplication((prev) => !prev);
          setButtonIcon((prev)=>{
            return (prev === "+") ? "x" : "+" 
        })
      }}/>}
      </div>) : (
        <div>
        <h5>title: {spot.title} filled by: {spot.user_id} band: {spot.band_id}</h5> 
      </div>
      )}
      </Fragment>
    );
  }