import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <h1>Navbar</h1>
      <Link to="/movies">Movies</Link>
      {user && (
        <>
          <Link to="/watchlist">WatchList</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/history">History</Link>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      )}

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
