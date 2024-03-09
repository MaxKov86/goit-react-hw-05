import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Novigation.module.css';

const makeClassActive = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const Novigation = () => {
  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink className={makeClassActive} to="/">
            Home
          </NavLink>
          <NavLink className={makeClassActive} to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
     
    </>
  );
};

export default Novigation;
