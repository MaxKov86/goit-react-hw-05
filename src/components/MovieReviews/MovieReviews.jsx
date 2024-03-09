import { useEffect, useState } from 'react';
import { getReviews } from '../../movie-api';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(movieId);
        console.log(data);
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [movieId]);
  return (
    <>
      {reviews(
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default MovieReviews;
