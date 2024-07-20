import React from "react";
import "../styles/_variables.scss";
import {
  filterBookmarkedMovies,
  filterBookmarkedSeries,
  filterSearchResults,
  filterBookmarkedMedia,
} from "../utils/dataFilters";
import MediaList from "../components/MediaList";
import { useSearchContext } from "../contexts/SearchContext";
import { useBookmarkContext } from "../contexts/BookmarkContext";
import "./Bookmark.scss";
const Bookmarks: React.FC = () => {
  const { searchQuery } = useSearchContext();
  const { movies } = useBookmarkContext();
  const bookmarkedMedia = filterBookmarkedMedia(movies);
  const filterFunction = searchQuery
    ? () => filterSearchResults(bookmarkedMedia, searchQuery)
    : filterBookmarkedMovies;

  return bookmarkedMedia.length > 0 || searchQuery ? (
    <>
      <MediaList
        FilterFunction={filterFunction}
        id="bookmarkedMovies"
        heading="Bookmarked Movies"
        isBookmarkPage
      />
      {!searchQuery && (
        <MediaList
          FilterFunction={filterBookmarkedSeries}
          id="bookmarkedSeries"
          heading="Bookmarked TV Series"
          isBookmarkPage
        />
      )}
    </>
  ) : (
    <h2 className="title">You have no bookmarked show</h2>
  );
};

export default Bookmarks;
