// import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Bookmarks from './pages/Bookmarks';
import {BrowserRouter as Router, Route,Routes,useLocation,} from 'react-router-dom';
import { useEffect } from 'react';
import { useSearchContext } from './contexts/SearchContext';
import './App.scss'


const AppContent:React.FC = () => {
  const location = useLocation();
  const { resetSearch } = useSearchContext();

  useEffect(() => {
    resetSearch();
  }, [location]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </MainLayout>
  );
};

function App() {

  return (
    <Router> 
      <AppContent/>
    </Router>
   
    
  )
}

export default App
