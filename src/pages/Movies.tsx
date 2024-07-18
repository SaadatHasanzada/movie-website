import React from 'react'
import MediaList from '../components/MediaList';
import { filterMovies,filterSearchResults } from '../utils/dataFilters';
import { useSearchContext } from '../contexts/SearchContext';
import { Movie } from '../interfaces/Movie';


const Movies:React.FC = () => {
  const {searchQuery}=useSearchContext();
  const filterFunction = searchQuery
  ? (movies: Movie[]) => filterSearchResults(filterMovies(movies), searchQuery)
  : filterMovies;
  
  return (
   <MediaList FilterFunction={filterFunction} id='movies' heading='Movies'/>
  )
}

export default Movies