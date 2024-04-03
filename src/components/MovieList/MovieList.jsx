import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.moviesList}>
      {movies.map(movie => (
        <li className={css.moviesItem} key={movie.id}>
          <Link
            className={css.moviesLink}
            to={`/movies/${movie.id}`}
            state={location}
          >
            <img
              className={css.moviesImg}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            {/* <p className={css.moviesText}>{movie.title}</p> */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
