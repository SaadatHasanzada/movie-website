import React from 'react'
import Trending from '../components/Trending'
import MediaList from '../components/MediaList';
import { filterRecommended,filterSearchResults } from '../utils/dataFilters';
import { Movie } from '../interfaces/Movie';
import { useSearchContext } from '../contexts/SearchContext';



const Home:React.FC = () => {
const {searchQuery}=useSearchContext();
  const filterFunction = searchQuery
  ? (movies: Movie[]) => filterSearchResults(movies, searchQuery)
  : filterRecommended;
  
  return (
    <>
    {!searchQuery &&  <Trending />}
    <MediaList FilterFunction={filterFunction} id='recommended' heading='Recommended for you'/>
    </>
   
  )
} 

export default Home