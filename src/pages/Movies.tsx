import { filterMovies, filterSearchResults } from "../utils/dataFilters";

import MediaList from "../components/MediaList";
import { Movie } from "../interfaces/Media";
import React from "react";
import { useSearchContext } from "../contexts/SearchContext";

const Movies: React.FC = () => {
  const { searchQuery } = useSearchContext();
  const filterFunction = searchQuery
    ? (movies: Movie[]) =>
        filterSearchResults(filterMovies(movies), searchQuery)
    : filterMovies;

  return (
    <MediaList FilterFunction={filterFunction} id="movies" heading="Movies" />
  );
};

export default Movies;
