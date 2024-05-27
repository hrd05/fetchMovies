import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

// const dummyMovies = [
//   {
//     id: '1',
//     title: "Muskan & Harsh",
//     releaseDate: '8th March',
//     openingText: 'M&H'
//   }
// ]

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      console.log('fetching movies');
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const result = await response.json();
      console.log(result.results);
      const movieData = result.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl
        }
      })
      setMovies(movieData);
    }
    catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler])


  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = < MoviesList movies={movies} />
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = error;
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
