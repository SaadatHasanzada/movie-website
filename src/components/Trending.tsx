import { Media } from "../interfaces/Media";
import MediaSlider from "./MediaSlider";
import React from "react";
import TrendingCard from "./TrendingCard";
import { getTrendingMedia } from "@/api/tmdb";
import { joinMedia } from "@/lib/utils";
import { useAsyncService } from "@/hooks/useAsyncService";

// import { useBookmarkContext } from "../contexts/BookmarkContext";

// import { filterTrending } from "../utils/dataFilters";

const Trending: React.FC = () => {
  // const { movies } = useBookmarkContext();
  // const trendingData: Movie[] = filterTrending(movies);
  let trendingData: Media[] = [];
  const { data: trendingMedia, loading: isTrendingMediaLoading } =
    useAsyncService(getTrendingMedia);

  if (trendingMedia) {
    const [movies, tvShows] = trendingMedia;
    const movieResults = movies.data.results;
    const tvResults = tvShows.data.results;
    trendingData = joinMedia(movieResults, tvResults);
  }
  return (
    <MediaSlider title="Trending">
      {trendingData.map((media) => (
        <TrendingCard
          key={media.id}
          TrendingMedia={media}
          isTrendingMediaLoading={isTrendingMediaLoading}
        />
      ))}
    </MediaSlider>
  );
};

export default Trending;
