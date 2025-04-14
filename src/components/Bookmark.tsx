import React, { useEffect } from "react";

import { useAsyncService } from "@/hooks/useAsyncService";
import { useBookmarkContext } from "../features/bookmark/hooks/BookmarkContext";
import { userService } from "@/features/auth/services/supabase";

interface StyleBookmark {
  className?: boolean;
  mediaId: number;
  mediaType: string;
}

const Bookmark: React.FC<StyleBookmark> = ({
  className,
  mediaId,
  mediaType
}) => {
  const { toggleBookmark, loading, isBookmarked } = useBookmarkContext();
  let isMediaBookmarked = isBookmarked(mediaId);
  // const { data: user } = useAsyncService(userService.getUser);

  const customStyle = isMediaBookmarked ? "fill-white" : "";

  return (
    <>
      <button
        title="Toggle Bookmark"
        disabled={loading}
        onClick={() => {
          toggleBookmark(mediaId, mediaType);
        }}
        className={`absolute top-2 right-2 ms:top-4 ms:right-4 w-8 !h-8 rounded-[50%] outline-none border-none z-[50] bg-dark_blue/50 cursor-pointer flex items-center justify-center transition-all duration-300  hover:bg-white group/bookmark   ${
          className ? "!right-6" : ""
        } `}
      >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            className={`group-hover/bookmark:stroke-dark_blue ${customStyle}`}
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
