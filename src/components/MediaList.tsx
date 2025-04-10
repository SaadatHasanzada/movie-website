import { Media } from "@/interfaces/Media";
import MediaCard from "./MediaCard";
import React from "react";
import { getRecommendedMedia } from "@/api/tmdb";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useBookmarkContext } from "../features/bookmark/hooks/BookmarkContext";
import { useSearchContext } from "../contexts/SearchContext";

interface MediaListProps {
  // FilterFunction: (movies: Movie[]) => Movie[];
  id: string;
  heading: string;
  isBookmarkPage?: boolean;
  customStyle?: React.CSSProperties;
  media: Media[];
  isMediaLoading: boolean;
}

const MediaList: React.FC<MediaListProps> = ({
  // FilterFunction,
  id,
  heading,
  isBookmarkPage,
  media,
  isMediaLoading
}) => {
  // let recommendedData: Media[] = [];

  // const { data: recommendedMedia, loading: isRecommendedMediaLoading } =
  //   useAsyncService(getRecommendedMedia);
  // if (recommendedMedia) {
  //   const [movies, tvShows] = recommendedMedia;
  //   const movieResults = movies.data.results;
  //   const tvResults = tvShows.data.results;
  //   movieResults.forEach((movie: Media) => (movie.media_type = "movie"));
  //   tvResults.forEach((tv: Media) => (tv.media_type = "tv"));
  //   recommendedData = mixMedia(movieResults, tvResults);
  // }
  // const { movies } = useBookmarkContext();
  const { searchQuery } = useSearchContext();
  // const filteredData: Movie[] = FilterFunction(movies);
  // const pageTitle = searchQuery
  //   ? `Found ${filteredData.length} results for' ${searchQuery}'`
  //   : heading;
  // if (isBookmarkPage && !searchQuery && !filteredData.length) return;
  return (
    <section>
      <h2 className="mb-6 lg:mb-[38px] font-light text-xl ms:text-[32px] text-white -tracking-[0.31] ms:tracking-normal">
        {heading}
      </h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 pr-4 ms:grid-cols-3 ms:gap-x-7 ms:gap-y-6 ms:pr-6 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 lg:pr-9   ">
        {media.map((media) => {
          return (
            <MediaCard
              key={media.id}
              media={media}
              isMediaLoading={isMediaLoading}
              //  FilteredMedia={data}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MediaList;
