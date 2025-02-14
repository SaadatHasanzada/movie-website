import { Media } from "../../interfaces/Media";
import React from "react";
import TrendingCard from "../TrendingCard";
import { filterTrending } from "../../utils/dataFilters";
import { getTrendingMedia } from "@/api/tmdb";
import style from "./style.module.scss";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useBookmarkContext } from "../../contexts/BookmarkContext";

const Trending: React.FC = () => {
  const { movies } = useBookmarkContext();
  // const trendingData: Movie[] = filterTrending(movies);
  const trendingData: Media[] = [];
  const { data: trendingMedia } = useAsyncService(getTrendingMedia);
  if (trendingMedia) {
    const [movies, tvShows] = trendingMedia;
    trendingData.push(...movies.data.results, ...tvShows.data.results);
  }
  console.log(trendingData);
  return (
    <section id={style.trending}>
      <h2 className={style.title}>Trending</h2>
      <div className={style.movieList}>
        {trendingData.map((media) => {
          return <TrendingCard key={media.id} TrendingMedia={media} />;
        })}
      </div>
    </section>
  );
};

export default Trending;
