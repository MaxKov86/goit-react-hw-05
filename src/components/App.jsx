import { NavLink, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/movies" element={<div>Movies</div>} />
        </Routes>
      </nav>
    </>
  );
}

export default App;
