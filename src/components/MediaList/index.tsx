import React from "react";
import style from "./style.module.scss";
import { Movie } from "../../interfaces/Movie";
import MediaCard from "../MediaCard";
import { useBookmarkContext } from "../../contexts/BookmarkContext";
import { useSearchContext } from "../../contexts/SearchContext";

interface FilterData {
  FilterFunction: (movies: Movie[]) => Movie[];
  id: string;
  heading: string;
  isBookmarkPage?: boolean;
}

const MediaList: React.FC<FilterData> = ({
  FilterFunction,
  id,
  heading,
  isBookmarkPage,
}) => {
  const { movies } = useBookmarkContext();
  const { searchQuery } = useSearchContext();
  const filteredData: Movie[] = FilterFunction(movies);
  const pageTitle = searchQuery
    ? `Found ${filteredData.length} results for' ${searchQuery}'`
    : heading;
  if (isBookmarkPage && !searchQuery && !filteredData.length) return;
  return (
    <section id={`${style[id]}`}>
      <h2 className={style.title}>{pageTitle}</h2>
      <div className={style.mediaList}>
        {filteredData.map((data) => {
          return <MediaCard key={data.title} FilteredMedia={data} />;
        })}
      </div>
    </section>
  );
};

export default MediaList;
