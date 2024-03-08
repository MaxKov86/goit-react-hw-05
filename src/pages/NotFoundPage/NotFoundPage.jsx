import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h1>Oops! This page is not found!</h1>
      <Link to="/">Back to home page</Link>
    </>
  );
};

export default NotFoundPage;
