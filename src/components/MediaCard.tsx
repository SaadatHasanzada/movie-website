import Bookmark from "./Bookmark";
import { Media } from "../interfaces/Media";
import MovieInfo from "./MovieInfo";
import PlayButton from "./PlayButton";
import React from "react";
import { useState } from "react";

interface FilteredMediaProps {
  // FilteredMedia: Movie;
  RecommendedMedia: Media;
  isTrendingMediaLoading: boolean;
  customStyle?: React.CSSProperties;
}
const MediaCard: React.FC<FilteredMediaProps> = ({ RecommendedMedia }) => {
  const [isHovered, setIsHovered] = useState(false);

  const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const backgroundImage = `${TMDB_IMAGE_BASE_URL}${RecommendedMedia.backdrop_path}`;

  const getMedia = () => {};

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="overflow-hidden group
        relative  w-full rounded-[8px] h-[110px] ms:h-[140px] lg:h-[174px] hover:after:opacity-[1]  after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:bg-black/50 after:duration-300 after:transition-all after:ease-linear"
      >
        <img
          className="w-full h-full group-hover:scale-110 transition-all duration-300 ease-linear"
          src={backgroundImage}
          alt=""
        />
        <Bookmark
          mediaId={RecommendedMedia?.id}
          mediaType={RecommendedMedia?.media_type}
        />
        <PlayButton isHovered={isHovered} onClick={getMedia} defaultValue />
      </div>
      <MovieInfo {...RecommendedMedia} isHovered />
    </div>
  );
};

export default MediaCard;
