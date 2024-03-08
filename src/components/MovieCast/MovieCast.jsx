import { useEffect, useState } from 'react';
import { getCast } from '../../movie-api';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getActors = async () => {
      try {
        const data = await getCast(movieId);
        console.log(data);
        setActors(data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    getActors();
  }, [movieId]);
  return (
    <>
      {actors && (
        <ul className={css.actorsList}>
          {actors.map(actor => (
            <li className={css.actorItem} key={actor.id}>
              <img className={css.actorImg}
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
              />
              <p>Actor: {actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
