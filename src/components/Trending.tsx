import { Media } from "../interfaces/Media";
import MediaSlider from "./MediaSlider";
import React from "react";
import TrendingCard from "./TrendingCard";
import { getTrendingMedia } from "@/api/tmdb";
import { useAsyncService } from "@/hooks/useAsyncService";

// import { useBookmarkContext } from "../contexts/BookmarkContext";

// import { filterTrending } from "../utils/dataFilters";




const Trending: React.FC = () => {
  // const { movies } = useBookmarkContext();
  // const trendingData: Movie[] = filterTrending(movies);
  const trendingData: Media[] = [];
  const { data: trendingMedia, loading: isTrendingMediaLoading } =
    useAsyncService(getTrendingMedia);

  if (trendingMedia) {
    const [movies, tvShows] = trendingMedia;
    const movieResults = movies.data.results;
    const tvResults = tvShows.data.results;

    const maxLength = Math.max(movieResults.length, tvResults.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < movieResults.length) trendingData.push(movieResults[i]);
      if (i < tvResults.length) trendingData.push(tvResults[i]);
    }
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
