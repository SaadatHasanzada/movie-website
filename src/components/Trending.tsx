import { Media } from "../interfaces/Media";
import React from "react";
import TrendingCard from "./TrendingCard";
import { filterTrending } from "../utils/dataFilters";
import { getTrendingMedia } from "@/api/tmdb";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useBookmarkContext } from "../contexts/BookmarkContext";

const Trending: React.FC = () => {
  const { movies } = useBookmarkContext();
  // const trendingData: Movie[] = filterTrending(movies);
  const trendingData: Media[] = [];
  const { data: trendingMedia, loading: isTrendingMediaLoading } =
    useAsyncService(getTrendingMedia);
  if (trendingMedia) {
    const [movies, tvShows] = trendingMedia;
    trendingData.push(...movies.data.results, ...tvShows.data.results);
  }
  return (
    <section className="mb-6 ms:mb-10">
      <h2 className="text-white text-[20px] ms:text-[32px] -tracking-[0.31] ms:tracking-[unset] mb-4 ms:mb-[25px]">
        Trending
      </h2>
      <div className="flex flex-nowrap overflow-x-auto  gap-4 pr-4 lg:pr-6 ms:gap-10 ms:pr-9 no-scrollbar">
        {trendingData.map((media) => {
          return (
            <TrendingCard
              key={media.id}
              TrendingMedia={media}
              isTrendingMediaLoading={isTrendingMediaLoading}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
