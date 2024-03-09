import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetailsById } from '../../movie-api';
import css from './MovieDetailsPage.module.css';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { FaHandPointLeft } from 'react-icons/fa';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetailsById(movieId);

        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [movieId]);
  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {movie && (
        <div>
          <Link to={backLinkRef.current}>
            <button>
              <FaHandPointLeft /> Go Back
            </button>
          </Link>
          <div className={css.movieContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
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
        </div>
      )}
      {movie && (
        <div className={css.addInfoContainer}>
          <p>Additional information</p>
          <ul className={css.addInfo}>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
      )}
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
