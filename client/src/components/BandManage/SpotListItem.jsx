import { Fragment, useState } from "react";
 
export default function SpotListItem (props) {
  const { spot } = props;
    return (
      <Fragment>
        <h1>{spot.title}</h1>
      </Fragment>
    );
  }