import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  const delteMovieHandler = (event) => {
    props.onClick(event.target.id);
  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button id={props.id} onClick={delteMovieHandler} >Remove Movie</button>
    </li>
  );
};

export default Movie;
