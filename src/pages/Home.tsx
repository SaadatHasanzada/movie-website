import { filterRecommended, filterSearchResults } from "../utils/dataFilters";

import { Media } from "@/interfaces/Media";
import MediaList from "../components/MediaList";
import React from "react";
import Trending from "../components/Trending";
import { getRecommendedMedia } from "@/api/tmdb";
import { joinMedia } from "@/lib/utils";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useSearchContext } from "../contexts/SearchContext";

const Home: React.FC = () => {
  const { data: recommendedMedia, loading: isRecommendedMediaLoading } =
    useAsyncService(getRecommendedMedia);
  let recommendedData: Media[] = [];

  // why you dont use state here instead of normal variable

  const { searchQuery } = useSearchContext();
  // const filterFunction = searchQuery
  //   ? (movies: Media[]) => filterSearchResults(movies, searchQuery)
  //   : filterRecommended;

  if (recommendedMedia) {
    recommendedData = joinMedia(recommendedMedia);
  }

  return (
    <>
      {!searchQuery && <Trending />}
      <MediaList
        // FilterFunction={filterFunction}
        id="recommended"
        heading="Recommended for you"
        media={recommendedData}
        isMediaLoading={isRecommendedMediaLoading}
      />
    </>
  );
};

export default Home;
