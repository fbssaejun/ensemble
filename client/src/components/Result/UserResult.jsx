import { useState, Fragment } from 'react';


export default function UserResult(props) {


  return (
      <Fragment>
        <h1>{props.firstName} {props.lastName}</h1>
        <h2>AKA {props.username}</h2>
      </Fragment>
  );

}