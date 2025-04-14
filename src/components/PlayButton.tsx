import React from "react";

interface PlayButtonProps {
  isHovered: boolean;
  onClick: () => void;
  defaultValue?: boolean;
}
const PlayButton: React.FC<PlayButtonProps> = ({
  isHovered,
  onClick,
  defaultValue
}) => {
  const positionClasses = defaultValue
    ? "inset-0 m-auto w-fit h-fit"
    : "bottom-4 right-4 ms:bottom-6 ms:right-6";

  return (
    <div
      onClick={onClick}
      className={`z-50 animate-pulse-white text-lg font-medium absolute   rounded-[50%] bg-white/25 scale-[1] shadow-[0 0 0 0 rgba(255, 255, 255, 0.25)]   ${
        isHovered ? "block" : "hidden"
      } ${positionClasses} `}
    >
      <svg
        className="w-[28px] h-[28px]  ms:w-9 ms:h-9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="scale-[0.9] ms:scale-[1.2]"
          d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
          fill="#FFF"
        />
      </svg>
    </div>
  );
};

export default PlayButton;
