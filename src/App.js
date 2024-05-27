import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';
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
      const response = await fetch('https://react-http-9080f-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      console.log(data);
      let loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText
        })
      }
      setMovies(loadedMovies);
    }
    catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler])

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-9080f-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = response.json();
    console.log(data);
  }

  const deleteMovieHandler = async (id) => {
    // console.log(id, 'calling through app.js');
    const response = await fetch(`https://react-http-9080f-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE'
    });
    console.log(response.json());
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  }


  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = < MoviesList onDelete={deleteMovieHandler} movies={movies} />
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
