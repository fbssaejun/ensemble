import { useParams } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import MyBandList from './MyBandList';
import axios from 'axios';
import UserInfo from './UserInfo'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import NewUserEdit from './NewUserEdit'
import ApplicationList from '../Application/ApplicationList';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import './UserProfile.scss'

export default function UserProfile(props) {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    Promise.all([
      axios.get(`/api/users/${userId}/edit`),
      axios.get('/api/instruments'),
      axios.get('/api/genres'),
      axios.get(`/api/users/${userId}`)
    ])
    .then((all) => {
      const userSetting = all[0].data;
      const inst = all[1].data;
      const genre = all[2].data;
      const userInfData = all[3].data;

      console.log("userSetting", userSetting)
      console.log("inst", inst)

      setUserInst([...userSetting.instResult]);
      setUserGenre([...userSetting.genreResult]);
      setAllInst([...inst]);
      setAllGenre([...genre]);

      setDefaultInst([...userSetting.instResult]);
      setDefaultGenre([...userSetting.genreResult]);

      setUserInfo(userInfData);
    })

  },[])


  // User Instrument and Genre Setting Stuff
  const [userInst, setUserInst] = useState([]);
  const [userGenre, setUserGenre] = useState([]);
  const [allInst, setAllInst] = useState();
  const [allGenre, setAllGenre] = useState();

  // defaultInst and defaultGenre is to get initial user
  // genre and instrument info
  const [defaultInst, setDefaultInst] = useState([]);
  const [defaultGenre, setDefaultGenre] = useState([]);

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

  const instAvatar = defaultInst.map((obj) => {
    return(
      <div className="inst-avatar">
        <Avatar
          alt={obj.name}
          src={obj.instrument_image}
          sx={{ width: 50, height: 40 }}
          name="avatar"
          id="avatar"
        />
        <p>{obj.name}</p>
      </div>
    )
  })


  const genreTags = defaultGenre.map((obj) => {
    return <Chip label={obj.name} />
  })

  return(
    <div className="user-profile">

        <div className="user-info-container">
          <UserInfo userInfo={userInfo}/>

          <div className="inst-genre-container">
          {defaultInst.length ? 
          <Fragment>
            <h5>Instruments</h5> 
              <div className="avatar-container">
                {instAvatar}
              </div>
          </Fragment>
          : 
          <Fragment>
            <h5>Instruments</h5> 
            <p className="profile-desc">You have no instruments</p>
          </Fragment>
          }

          {defaultGenre.length ?
          <Fragment>
              <h5>Genre</h5>
            <div className="genre-container">
                <Stack direction="row" spacing={1}>
                {genreTags}
                </Stack>
            </div>
          </Fragment>
          :
          <Fragment>
            <h5>Genre</h5> 
            <p className="profile-desc">You have no genre</p>
          </Fragment>
          }
          </div>
            {sessionStorage.getItem('id') === userId && <button className="edit-button" onClick={() => handleOpen()}>Edit</button>}             
        </div>

      <div className="profile-right">

      <h5>Bands</h5>
      
        <div className="profile-band-container">
          <MyBandList userId={userId} />
        </div>

          <h5>Applications</h5>
        <div className="profile-application-container">
          <ApplicationList />
        </div>

      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewUserEdit 
            userId={userId}
            userInst={userInst}
            setUserInst={setUserInst}
            userGenre={userGenre}
            setUserGenre={setUserGenre}
            allInst={allInst}
            allGenre={allGenre}
            defaultInst={defaultInst}
            defaultGenre={defaultGenre}
            setDefaultInst={setDefaultInst}
            setDefaultGenre={setDefaultGenre}
            handleClose={handleClose}
          />
        </Box>
      </Modal>

    </div>
  )
}

