import { filterSearchResults, filterSeries } from "../utils/dataFilters";

import MediaList from "../components/MediaList";
import { Movie } from "../interfaces/Media";
import React from "react";
import { useSearchContext } from "../contexts/SearchContext";

const Series: React.FC = () => {
  const { searchQuery } = useSearchContext();
  const filterFunction = searchQuery
    ? (movies: Movie[]) =>
        filterSearchResults(filterSeries(movies), searchQuery)
    : filterSeries;
  return (
    <MediaList
      FilterFunction={filterFunction}
      id="series"
      heading="TV Series"
    />
  );
};

export default Series;
