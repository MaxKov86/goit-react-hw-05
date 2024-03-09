import { getTrendingMovies } from '../../movie-api';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        console.log(data);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {loading && <Loading />}
      {error && <Error />}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
