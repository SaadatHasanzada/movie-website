import React from "react";
import {
  filterBookmarkedMovies,
  filterBookmarkedSeries,
  filterSearchResults,
  filterBookmarkedMedia,
} from "../utils/dataFilters";
import MediaList from "../components/MediaList";
import { useSearchContext } from "../contexts/SearchContext";
import { Movie } from "../interfaces/Movie";

const Bookmarks: React.FC = () => {
  const { searchQuery } = useSearchContext();
  const filterFunction = searchQuery
    ? (movies: Movie[]) =>
        filterSearchResults(filterBookmarkedMedia(movies), searchQuery)
    : filterBookmarkedMovies;

  return (
    <>
      <MediaList
        FilterFunction={filterFunction}
        id="bookmarkedMovies"
        heading="Bookmarked Movies"
      />
      {!searchQuery && (
        <MediaList
          FilterFunction={filterBookmarkedSeries}
          id="bookmarkedSeries"
          heading="Bookmarked TV Series"
        />
      )}
    </>
  );
};

export default Bookmarks;
