import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
        Dashboard
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
        
        <MenuItem onClick={handleClose}><Link to={`/users/${props.currentUser.id}`}>Profile</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to={`/bands/new`}>Create New Band</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to={`/users/${props.currentUser.id}/app`}>Applications</Link></MenuItem>
        <MenuItem onClick={handleClose}><button type="submit" onClick={logOut}>Logout</button></MenuItem>
      </Menu>
    </div>
  );
}
