import Bookmark from "../Bookmark";
import { Media } from "../../interfaces/Media";
import MovieInfo from "../MovieInfo";
import PlayButton from "../PlayButton";
import React from "react";
import style from "./style.module.scss";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

interface TrendingCardProps {
  TrendingMedia: Media;
}
const TrendingCard: React.FC<TrendingCardProps> = ({ TrendingMedia }) => {
  const [isHovered, setIsHovered] = useState(false);

  const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const backgroundImageStyle = {
    backgroundImage: `url(${TMDB_IMAGE_BASE_URL}${TrendingMedia.backdrop_path})`
  };

  return (
    <div
      className={style.movieCard}
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
