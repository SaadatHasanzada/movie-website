import { filterMovies, filterSearchResults } from "../utils/dataFilters";
import { useEffect, useState } from "react";

import { Media } from "@/interfaces/Media";
import MediaList from "../components/MediaList";
import MediaSlider from "@/components/MediaSlider";
import React from "react";
import TrendingCard from "@/components/TrendingCard";
import { addMediaType } from "@/lib/utils";
import { getAllMovies } from "@/api/tmdb";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useSearchContext } from "../contexts/SearchContext";

const Movies: React.FC = () => {
  const { data: movies, loading: isMoviesLoading } =
    useAsyncService(getAllMovies);
  const [moviesData, setMoviesData] = useState<
    {
      data: Media[];
      title: string;
    }[]
  >([]);

  useEffect(() => {
    if (movies) {
      setMoviesData([
        { data: movies[3].data?.results, title: "Now Playing Movies" },
        { data: movies[0].data?.results, title: "Popular Movies" },
        { data: movies[1].data?.results, title: "Top Rated Movies" },
        { data: movies[2].data?.results, title: "Upcoming Movies" }
      ]);
    }
  }, [movies]);

  // const { searchQuery } = useSearchContext();
  // const filterFunction = searchQuery
  //   ? (movies: Movie[]) =>
  //       filterSearchResults(filterMovies(movies), searchQuery)
  //   : filterMovies;
  return moviesData.map((movieList) => (
    <MediaSlider key={movieList.title} title={movieList.title}>
      {addMediaType(movieList.data, "movie")?.map((media) => (
        <TrendingCard
          key={media.id}
          TrendingMedia={media}
          isTrendingMediaLoading={isMoviesLoading}
        />
      )) || []}
    </MediaSlider>
  ));
};

export default Movies;
