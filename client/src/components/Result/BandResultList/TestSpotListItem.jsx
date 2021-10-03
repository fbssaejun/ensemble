import { Fragment, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";

export default function SpotListItem (props) {
  const { spot, currentUser } = props;

  return (
    <Fragment>
      <IconButton onClick={() => console.log("hi")}>
        <Avatar alt={spot.username} src={'/'} />
      </IconButton>
    </Fragment>
  );
}