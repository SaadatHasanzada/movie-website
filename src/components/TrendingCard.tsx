import Bookmark from "./Bookmark";
import { Media } from "../interfaces/Media";
import MovieInfo from "./MovieInfo";
import PlayButton from "./PlayButton";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

interface TrendingCardProps {
  TrendingMedia: Media;
  isTrendingMediaLoading: boolean;
}
const TrendingCard: React.FC<TrendingCardProps> = ({
  TrendingMedia,
  isTrendingMediaLoading
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const backgroundImageStyle = {
    backgroundImage: `url(${TMDB_IMAGE_BASE_URL}${TrendingMedia.backdrop_path})`
  };
  console.log(isTrendingMediaLoading);
  if (isTrendingMediaLoading) {
    return (
      <div className="w-[240px] h-[140px] ms:w-[470px] ms:h-[230px] rounded-[8px]  leading-none  shrink-0">
        <Skeleton baseColor="#5a6a90" height="100%" width="100%" duration={1} />
      </div>
    );
  }

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative flex w-[240px] h-[140px] ms:w-[470px] ms:h-[230px] rounded-[8px] overflow-hidden shrink-0 cursor-pointer items-end hover:after:opacity-[1] after:content-[''] after:absolute  after:opacity-0 after:w-full after:h-full after:top-0 after:left-0 after:transition-all after:duration-300 after:ease after:bg-black/50 "
      style={backgroundImageStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <Bookmark
        className
        title={TrendingMovie.title}
        isBookmarked={TrendingMovie.isBookmarked}
      /> */}
      <MovieInfo isHovered={isHovered} customStyle {...TrendingMedia} />
      <PlayButton isHovered={isHovered} />
    </div>
  );
};

export default TrendingCard;
