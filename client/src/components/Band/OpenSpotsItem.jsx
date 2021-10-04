import { useState, Fragment, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ApplicationForm from '../ApplicationForm';
import WarningMessage from '../BrowserMessage/Warning';

export default function OpenSpotItem(props) {


  const ref = useRef(null);
  const history = useHistory();
  const { spot, currentUser } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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



  return (
    <Fragment>
    <div className="open-avatar">
      <IconButton onClick={() => {
        if(currentUser === undefined) {
          history.push('/auth')
          return;
        } 
        handleOpen()
      }}>
        <Avatar
          alt={spot.name}
          src={spot.profile_image}
          sx={{ width: 50, height: 50 }}
          name="avatar"
          id="avatar"
        />
      </IconButton>
      <span className="avatar-name">{"test name"}</span>
    </div>
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
  )

}
