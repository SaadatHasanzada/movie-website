import "../css/index.css";

import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";

import { AnimatePresence } from "motion/react";
import Bookmarks from "./pages/Bookmarks";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Movies from "./pages/Movies";
import Registration from "./pages/Registration";
import Series from "./pages/Series";
import { useEffect } from "react";
import { useSearchContext } from "./contexts/SearchContext";

const AuthRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const { resetSearch } = useSearchContext();

  useEffect(() => {
    resetSearch();
  }, [location]);

  const isAuthRoute = ["/login", "/registration"].includes(location.pathname);

  return (
    <>
      {isAuthRoute ? (
        <AuthRoutes />
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />

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
      )}
    </>
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
