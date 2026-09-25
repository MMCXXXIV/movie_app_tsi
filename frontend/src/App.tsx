import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage";
import RegisterPage from "./pages/RegisterPage";
import WatchlistPage from "./pages/WatchlistPage";

const App = () => {
  return (
    <div>
      <FavoritesPage />
      <HistoryPage />
      <LoginPage />
      <MovieDetailsPage />
      <MoviesPage />
      <RegisterPage />
      <WatchlistPage />
    </div>
  );
};

export default App;
