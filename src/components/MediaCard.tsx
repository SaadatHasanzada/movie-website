import Bookmark from "./Bookmark";
import { Movie } from "../interfaces/Media";
import MovieInfo from "./MovieInfo";
import PlayButton from "./PlayButton";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

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
    backgroundImage: `url(${bgImage})`
  };
  const getMedia = () => {
    console.log("recommended media");
  };
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
          src={bgImage}
          alt=""
        />
        <Bookmark
          title={FilteredMedia.title}
          isBookmarked={FilteredMedia.isBookmarked}
        />
        <PlayButton isHovered={isHovered} onClick={getMedia} defaultValue />
      </div>
      {/* <MovieInfo {...FilteredMedia} /> */}
    </div>
  );
};

export default MediaCard;
