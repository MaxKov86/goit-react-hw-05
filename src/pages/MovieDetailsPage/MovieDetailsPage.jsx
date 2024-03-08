import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getMovieDetailsById } from '../../movie-api';
import css from './MovieDetailsPage.module.css';
import { Link } from 'react-router-dom';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await getMovieDetailsById(movieId);

        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [movieId]);
  return (
    <>
      {movie && (
        <div className={css.movieContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={css.movieInfo}>
            <h2>
              {movie.original_title}({movie.release_date.slice(0, 4)})
            </h2>
            <p>User score: {Math.round(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Geners</h4>
            <p className={css.geners}>
              {movie.genres.map(item => (
                <span key={item.id}>{item.name}</span>
              ))}
            </p>
          </div>
        </div>
      )}
      <p>Additional information</p>
      <ul className={css.addInfo}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
