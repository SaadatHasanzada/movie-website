import React from 'react'
import MediaList from '../components/MediaList';
import { filterSeries,filterSearchResults } from '../utils/dataFilters';
import { useSearchContext } from '../contexts/SearchContext';
import { Movie } from '../interfaces/Movie';
const Series:React.FC = () => {
  const {searchQuery}=useSearchContext();
  const filterFunction = searchQuery
  ? (movies: Movie[]) => filterSearchResults(filterSeries(movies), searchQuery)
  : filterSeries;
  return (
    <MediaList FilterFunction={filterFunction} id='series' heading='TV Series'/>
  )
}

export default Series