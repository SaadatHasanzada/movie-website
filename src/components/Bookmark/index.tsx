import React from "react";
import style from "./style.module.scss";
import { useBookmarkContext } from "../../contexts/BookmarkContext";

interface StyleBookmark {
  className?: boolean;
  title: string;
  isBookmarked: boolean;
}

const Bookmark: React.FC<StyleBookmark> = ({
  className,
  title,
  isBookmarked,
}) => {
  const { toggleBookmark } = useBookmarkContext();
  const customStyle = isBookmarked ? style.bookmarked : "";
  return (
    <>
      <button
        title="Toggle Bookmark"
        onClick={() => {
          toggleBookmark(title);
        }}
        className={`${style.bookmark} ${
          className ? style.trendingBookmark : ""
        } ${customStyle}`}
      >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            stroke="#FFF"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </button>
    </>
  );
};

export default Bookmark;
