import { NavLink } from "react-router-dom";
import { Button, Group, Text } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import "../styles/components/Navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <NavLink to="/movies" className="navbar__brand">
        ReelTime
      </NavLink>

      <nav className="navbar__links" aria-label="Main navigation">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `navbar__link${isActive ? " navbar__link--active" : ""}`
          }
        >
          Movies
        </NavLink>

        {user && (
          <>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--active" : ""}`
              }
            >
              Watchlist
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--active" : ""}`
              }
            >
              Favorites
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--active" : ""}`
              }
            >
              History
            </NavLink>
          </>
        )}
      </nav>

      <Group gap="sm" className="navbar__account">
        {user ? (
          <>
            <Text className="navbar__username" size="sm">
              {user.username}
            </Text>
            <Button variant="outline" color="gray" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              component={NavLink}
              to="/login"
              variant="subtle"
              color="gray"
            >
              Log in
            </Button>
            <Button component={NavLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Group>
    </header>
  );
};

export default Navbar;
