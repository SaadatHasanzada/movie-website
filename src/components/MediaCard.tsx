import Bookmark from "./Bookmark";
import { Media } from "../interfaces/Media";
import MovieInfo from "./MovieInfo";
import PlayButton from "./PlayButton";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { getMediaVideoById } from "@/api/tmdb";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useState } from "react";
import { useTrailer } from "@/hooks/useTrailer";

interface FilteredMediaProps {
  // FilteredMedia: Movie;
  media: Media;
  isMediaLoading: boolean;
  customStyle?: React.CSSProperties;
}
const MediaCard: React.FC<FilteredMediaProps> = ({ media, isMediaLoading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { showTrailer } = useTrailer();

  const { execute: executeGetMediaVideo } = useAsyncService(
    getMediaVideoById,
    false
  );

  const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const backgroundImage = `${TMDB_IMAGE_BASE_URL}${media.backdrop_path}`;

  const handleGetMediaVideo = async () => {
    const mediaVideo = await executeGetMediaVideo(media?.id, media?.media_type);
    if (mediaVideo) {
      showTrailer(mediaVideo.data.results);
    }
  };

  if (isMediaLoading) {
    return (
      <div className="w-full h-[110px] ms:h-[140px] lg:h-[174px] rounded-[8px]  leading-none  shrink-0">
        <Skeleton baseColor="#5a6a90" height="100%" width="100%" duration={1} />
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="overflow-hidden group
        relative  rounded-[8px]  w-full h-[110px] ms:h-[140px] lg:h-[174px] hover:after:opacity-[1]  after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:bg-black/50 after:duration-300 after:transition-all after:ease-linear"
      >
        <img
          className="w-full h-full group-hover:scale-110 transition-all duration-300 ease-linear"
          src={backgroundImage}
          alt=""
        />
        <Bookmark mediaId={media?.id} mediaType={media?.media_type} />
        <PlayButton
          isHovered={isHovered}
          onClick={handleGetMediaVideo}
          defaultValue
        />
      </div>
      <MovieInfo {...media} isHovered />
    </div>
  );
};

export default MediaCard;
