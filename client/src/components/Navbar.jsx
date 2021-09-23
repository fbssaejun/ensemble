import React from 'react';

export default function Navbar(props) {
  // console.log("stuff:", props);
  const stuff = props.genres.map(genre => (
    <h1 key={genre.id}>{genre.name}</h1> 
  ));
  return (
    <section>{stuff}</section>
  );
}

