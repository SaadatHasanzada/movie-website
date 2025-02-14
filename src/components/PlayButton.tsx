import React from "react";

interface PlayButtonProps {
  isHovered: boolean;
}
const PlayButton: React.FC<PlayButtonProps> = ({ isHovered }) => {
  return (
    <div
      className={`animate-pulse-white text-lg font-medium absolute top-[14px] left-[14px] rounded-[50%] bg-white/25 z-30 scale-[1] shadow-[0 0 0 0 rgba(255, 255, 255, 0.25)]   ${
        isHovered ? "block" : "hidden"
      } `}
    >
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
          fill="#FFF"
        />
      </svg>
    </div>
  );
};

export default PlayButton;
