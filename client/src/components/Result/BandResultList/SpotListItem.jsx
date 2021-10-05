import { Fragment, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ApplicationForm from "../../ApplicationForm";
import WarningMessage from "../../BrowserMessage/Warning";

export default function SpotListItem (props) {

  const ref = useRef(null);

  const { spot, currentUser } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const history = useHistory();

  const buttonBehavior = () => {
    if (spot.user_id === null) {
      handleOpen()
    } else {
      history.push(`/users/${spot.user_id}`)
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  console.log(spot)

  return (
    <Fragment>
      <IconButton onClick={() => buttonBehavior()}>
        <Avatar alt={spot.username} src={spot.user_id ? spot.profile_image : spot.instrument_image} />
      </IconButton>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ApplicationForm
            spotId={spot.id}
            currentUser={currentUser}
            handleOpen={handleOpen}
            handleClose={handleClose}
            displaySuccess={() => ref.current?.("Passed")}
          />
        </Box>
      </Modal>
      <WarningMessage 
        children={(add) => {
          ref.current = add;
        }}
      />
    </Fragment>
  );
}