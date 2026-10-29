import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import WatchlistPage from "../pages/WatchlistPage";
import FavoritesPage from "../pages/FavoritesPage";
import HistoryPage from "../pages/HistoryPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/movies", element: <MoviesPage /> },
      { path: "/movies/:id", element: <MovieDetailsPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/watchlist", element: <WatchlistPage /> },
          { path: "/favorites", element: <FavoritesPage /> },
          { path: "/history", element: <HistoryPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);
