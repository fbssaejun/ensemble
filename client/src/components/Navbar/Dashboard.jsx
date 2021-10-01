import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import userIcon from './rockstar.png';

export default function Dashboard(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const open = Boolean(anchorEl);

  const logOut = () => {
    props.setState(prev => ({...prev, currentUser: undefined}))
    history.push("/");
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={userIcon}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={()=> history.push(`/users/${props.currentUser.id}`)}>Profile</MenuItem>
        <MenuItem onClick={()=> history.push(`/bands/new`)}>Create New Band</MenuItem>
        <MenuItem onClick={()=> history.push(`/users/${props.currentUser.id}/app`)}>My Applications</MenuItem>
        <MenuItem onClick={()=> history.push(`/bands/manage`)}>My Bands</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
