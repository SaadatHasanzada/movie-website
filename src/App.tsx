// import './App.css'
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Bookmarks from "./pages/Bookmarks";
import Error from "./pages/Error";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useSearchContext } from "./contexts/SearchContext";
import "./App.scss";

const AppContent: React.FC = () => {
  const location = useLocation();
  const { resetSearch } = useSearchContext();

  useEffect(() => {
    resetSearch();
  }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/movies"
        element={
          <MainLayout>
            <Movies />
          </MainLayout>
        }
      />
      <Route
        path="/series"
        element={
          <MainLayout>
            <Series />
          </MainLayout>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <MainLayout>
            <Bookmarks />
          </MainLayout>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
