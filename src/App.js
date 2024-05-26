import React, { useState } from 'react';

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

  const fetchMoviesHandler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://swapi.dev/api/film/');
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
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && !error && < MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies..  </p>}
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
