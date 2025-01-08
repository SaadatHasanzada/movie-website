import "../css/index.css";

import { AuthProvider, useAuth } from "./features/auth/hooks/AuthContext";
import {
  Navigate,
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
import Movies from "./pages/Movies";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ROUTES } from "./constants";
import Registration from "./pages/Registration";
import Series from "./pages/Series";
import { authService } from "./features/auth/services/supabase";
import { useEffect } from "react";
import { useSearchContext } from "./contexts/SearchContext";

const PROTECTED_ROUTES = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.MOVIES, element: <Movies /> },
  { path: ROUTES.SERIES, element: <Series /> },
  { path: ROUTES.BOOKMARKS, element: <Bookmarks /> }
];

// const AUTH_ROUTES = [
//   { path: ROUTES.LOGIN, element: <Login /> },
//   { path: ROUTES.REGISTRATION, element: <Registration /> }
// ];

const AuthRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
      </Routes>
    </AnimatePresence>
  );
};

const MainRoutes = () => {
  const location = useLocation();
  const { resetSearch } = useSearchContext();
  const { isAuthenticated, isLoading } = useAuth();
  useEffect(() => {
    resetSearch();
  }, [location]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path={ROUTES.LANDING}
        element={
          isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Landing />
        }
      />
      {PROTECTED_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {element}
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute = [ROUTES.LOGIN, ROUTES.REGISTRATION].includes(
    location.pathname as "/login" | "/registration"
  );

  return isAuthRoute ? <AuthRoutes /> : <MainRoutes />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
