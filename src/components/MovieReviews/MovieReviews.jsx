import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataByAxios } from '../../Api/Api';
import css from './MovieReviews.module.css';
import { toast } from 'react-hot-toast';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    getDataByAxios(`/movie/${movieId}/reviews`, 0, '')
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        } else {
          setMovieReviews(resp.data.results);
        }
      })
      .catch(error => toast.error(error.message));
  }, [movieId]);

  return (
    <div>
      {movieReviews.length === 0 ? (
        <h4 className={css.reviewsTitle}>
          We don&apos;t have any reviews for this movie.
        </h4>
      ) : (
        <h4 className={css.reviewsTitle}>Reviews</h4>
      )}
      {movieReviews.length > 0 && (
        <ul>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
