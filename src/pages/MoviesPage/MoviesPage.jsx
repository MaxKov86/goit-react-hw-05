import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByQuery } from '../../movie-api';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const MoviesPage = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();

  const queryFilter = params.get('query') ?? '';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setSearchedMovies([]);
        setIsLoading(true);
        const data = await getMoviesByQuery(queryFilter);
        setSearchedMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [queryFilter]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.searchQuery.value.trim();
    if (searchQuery === '') {
      toast('🙃 Pleas input something!');
    }
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
      {isLoading && <Loading />}
      {error && <Error />}
      {searchedMovies && <MovieList movies={searchedMovies} />}
      <Toaster />
    </>
  );
};

export default MoviesPage;
