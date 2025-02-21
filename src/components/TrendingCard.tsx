// import { AxiosResponse } from "axios";

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

interface TrendingCardProps {
  TrendingMedia: Media;
  isTrendingMediaLoading: boolean;
}
const TrendingCard: React.FC<TrendingCardProps> = ({
  TrendingMedia,
  isTrendingMediaLoading
}) => {
  const { execute: executeGetMediaVideo } = useAsyncService(
    getMediaVideoById,
    false
  );
  const [isHovered, setIsHovered] = useState(false);
  const { showTrailer } = useTrailer();

  const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const backgroundImageStyle = {
    backgroundImage: `url(${TMDB_IMAGE_BASE_URL}${TrendingMedia.backdrop_path})`
  };
  if (isTrendingMediaLoading) {
    return (
      <div className="w-[240px] h-[140px] ms:w-[470px] ms:h-[230px] rounded-[8px]  leading-none  shrink-0">
        <Skeleton baseColor="#5a6a90" height="100%" width="100%" duration={1} />
      </div>
    );
  }
  const handleGetMediaVideo = async () => {
    const mediaVideo = await executeGetMediaVideo(
      TrendingMedia?.id,
      TrendingMedia?.media_type
    );
    if (mediaVideo) {
      showTrailer(mediaVideo.data.results);
    }
  };
  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center relative flex w-[240px] h-[140px] ms:w-[470px] ms:h-[230px] rounded-[8px] overflow-hidden shrink-0 cursor-pointer items-end hover:after:opacity-[1] after:content-[''] after:absolute  after:opacity-0 after:w-full after:h-full after:top-0 after:left-0 after:transition-all after:duration-300 after:ease after:bg-black/50 "
        style={backgroundImageStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Bookmark
          className
          mediaId={TrendingMedia?.id}
          mediaType={TrendingMedia?.media_type}
        />
        <MovieInfo isHovered={isHovered} customStyle {...TrendingMedia} />
        <PlayButton isHovered={isHovered} onClick={handleGetMediaVideo} />
      </div>
    </>
  );
};

export default TrendingCard;
