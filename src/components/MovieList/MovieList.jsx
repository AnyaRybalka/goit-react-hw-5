import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import css from './MovieList.module.css';

const MovieList = ({
  location,
  movieList,
  paginationPage,
  totalPages,
  onLoadNextPage,
  onLoadPreviousPage,
  onToStartPage,
}) => {
  const handleContextMenu = () => {
    localStorage.setItem('actualLocation', JSON.stringify(location));
  };

  return (
    <>
      <ul>
        {movieList.map(({ id, title }) => (
          <li key={id} className={css.listTxt}>
            <Link
              onContextMenu={handleContextMenu}
              to={`/movies/${id}`}
              state={location}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <div className={css.buttonWrap}>
        {movieList.length !== 0 && paginationPage < totalPages && (
          <Button btnName={'Next page'} onClick={onLoadNextPage} />
        )}
        {movieList.length !== 0 && paginationPage > 1 && (
          <>
            <Button btnName={'Previous page'} onClick={onLoadPreviousPage} />
            <Button btnName={'Start page'} onClick={onToStartPage} />
          </>
        )}
      </div>
    </>
  );
};

MovieList.propTypes = {
  location: PropTypes.object.isRequired,
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  paginationPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onLoadNextPage: PropTypes.func.isRequired,
  onLoadPreviousPage: PropTypes.func.isRequired,
  onToStartPage: PropTypes.func.isRequired,
};

export default MovieList;
