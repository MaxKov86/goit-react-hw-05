import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByQuery } from '../../movie-api';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [params, setParams] = useSearchParams();

  const queryFilter = params.get('query') ?? '';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByQuery(queryFilter);
        console.log(data);
        setSearchedMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [queryFilter]);
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.searchQuery.value.trim();
    params.set('query', searchQuery);
    setParams(params);
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchQuery"
          placeholder="Search Movie..."
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      {searchedMovies && <MovieList movies={searchedMovies} />}
    </>
  );
};

export default MoviesPage;
