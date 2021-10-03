import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './MyBand.scss';

const HorizontalAccordion = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  let collapsed = isOpen ? "" : "collapsed";

  return (
    <div className='horizontal-accordion'>
      <div className={`horizontal-accordion-content ${collapsed}`}>
        {children}
      </div>
      <div onClick={() => setIsOpen(!isOpen)} className={`horizontal-accordion-control ${collapsed}`}><span>&lt;</span></div>
    </div>
  );
}

export default function MyBand(props) {
  const [spots, setSpots] = useState([]);
  const { name, description, image, bandId, currentUser, featured, cachedBands, setCachedBands } = props;

  useEffect(()=> {
    axios.get(`/api/spots/users/${currentUser.id}`).then((results) => {
      setSpots(results.data);
    })
  }, [])

  const mySpot = spots.filter((spot) => {
    return spot.band_id === bandId;
  })

  const leaveBand = (spotId) => {
    axios.patch(`/api/spots/${spotId}`, {userId:currentUser.id}).then((results) => {
      const updatedSpot = results.data.result.rows[0];
      const newBands = cachedBands.filter((band) => band.id !== updatedSpot.band_id)
      setCachedBands((prev) => [...newBands])
    })
  }

  return (
    <div className="my-band-item">
      <div>
        <h2>{name}</h2>
        {mySpot.length && <h3>My Spot: {mySpot[0].instrument_name}</h3>}
      </div>
      <HorizontalAccordion>
        <button type="button" onClick={(event)=>{
          event.preventDefault();
          leaveBand(mySpot[0].id)
        }}>Leave Band
        </button>
      </HorizontalAccordion>
      
    </div>
  )
  
}
//  <Accordion>
//   <AccordionSummary
//     expandIcon={<ExpandMoreIcon/>}
//     aria-controls="panel1a-content"
//     id="panel1a-header"
//   >
//   </AccordionSummary>
//   <AccordionDetails>
//     <button type="button" onClick={(event)=>{
//       event.preventDefault();
//       leaveBand(mySpot[0].id)
//     }}>Leave Band
//     </button>
//   </AccordionDetails>
// </Accordion> 