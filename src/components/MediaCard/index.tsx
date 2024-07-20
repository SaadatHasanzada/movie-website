import React from "react";
import style from "./style.module.scss";
import Bookmark from "../Bookmark";
import MovieInfo from "../MovieInfo";
import { Movie } from "../../interfaces/Movie";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import PlayButton from "../PlayButton";

interface FilteredMediaProps {
  FilteredMedia: Movie;
}
const MediaCard: React.FC<FilteredMediaProps> = ({ FilteredMedia }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 767.98px)" });
  const isIpad = useMediaQuery({ query: "(max-width: 1024px)" });
  let bgImage;
  if (isMobile) {
    bgImage = FilteredMedia.thumbnail.regular.small;
  } else if (isIpad) {
    bgImage = FilteredMedia.thumbnail.regular.medium;
  } else {
    bgImage = FilteredMedia.thumbnail.regular.large;
  }
  const backgroundImageStyle = {
    backgroundImage: `url(${bgImage})`,
  };
  return (
    <div
      className={style.mediaCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style.thumbnail} style={backgroundImageStyle}>
        <Bookmark
          title={FilteredMedia.title}
          isBookmarked={FilteredMedia.isBookmarked}
        />
        <PlayButton isHovered={isHovered} />
      </div>
      <MovieInfo {...FilteredMedia} />
    </div>
  );
};

export default MediaCard;
