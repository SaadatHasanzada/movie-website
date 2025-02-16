import { getMediaVideoById, getTrendingMedia } from "@/api/tmdb";

import { Media } from "../interfaces/Media";
import MediaSlider from "./MediaSlider";
import React from "react";
import TrendingCard from "./TrendingCard";
import { filterTrending } from "../utils/dataFilters";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useBookmarkContext } from "../contexts/BookmarkContext";

const Trending: React.FC = () => {
  const { movies } = useBookmarkContext();
  // const trendingData: Movie[] = filterTrending(movies);
  const trendingData: Media[] = [];
  const { data: trendingMedia, loading: isTrendingMediaLoading } =
    useAsyncService(getTrendingMedia);
  const { data: mediaVideo, execute: executeGetMediaVideo } = useAsyncService(
    getMediaVideoById,
    false
  );
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
          execute={executeGetMediaVideo}
          mediaVideo={mediaVideo?.data?.results}
        />
      ))}
    </MediaSlider>
  );
};

export default Trending;
