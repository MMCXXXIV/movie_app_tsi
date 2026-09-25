import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import WatchlistPage from "../pages/WatchlistPage";
import FavoritesPage from "../pages/FavoritesPage";
import HistoryPage from "../pages/HistoryPage";

createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/movies", element: <MoviesPage /> },
  { path: "/movies/:id", element: <MovieDetailsPage /> },
  { path: "/watchlist", element: <WatchlistPage /> },
  { path: "/favorites", element: <FavoritesPage /> },
  { path: "/history", element: <HistoryPage /> },
]);
