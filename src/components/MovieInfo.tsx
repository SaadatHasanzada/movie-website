import React, { ReactElement, useState } from "react";

import { Media } from "../interfaces/Media";

interface MovieInfoProps extends Media {
  customStyle?: boolean;
  isHovered: boolean;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ customStyle, ...props }) => {
  const {
    title,
    name,
    release_date,
    first_air_date,
    media_type,
    vote_average,
    isHovered
  } = props;
  let svgEl: ReactElement;
  const [isTextHovered, setIsTextHovered] = useState(false);

  if (media_type === "movie") {
    svgEl = (
      <svg
        className="mr-[6px]"
        width="12"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
          fill="#FFF"
          opacity=".75"
        />
      </svg>
    );
  } else {
    svgEl = (
      <svg
        className="mr-[6px]"
        width="12"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z"
          fill="#FFF"
          opacity=".75"
        />
      </svg>
    );
  }

  return (
    <>
      <div
        className={`w-full  ${
          customStyle
            ? "p-4 pr-[50px] ms:p-6 ms:pr-[70px] bg-[linear-gradient 180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%]"
            : "pt-2"
        } ${isHovered ? "block" : "hidden"} z-40`}
      >
        <div className="flex">
          <span
            className={`text-white/75 mr-[18px] ${
              customStyle
                ? "text-xs ms:text-[15px]"
                : "text-[11px] ms:text-[13px]"
            } `}
          >
            {release_date?.slice(0, 4) || first_air_date?.slice(0, 4)}
          </span>
          <span
            className={`before:content-[""] before:w-[3px] before:h-[3px] before:bg-white before:absolute before:top-1/2 before:rounded-[50%] before:-translate-y-1/2 before:-left-[10px]  text-white/75 ${
              customStyle
                ? "text-xs ms:text-[15px]"
                : "text-[11px] ms:text-[13px]"
            }  flex items-center relative`}
          >
            {svgEl}
            {media_type?.[0].toUpperCase() + media_type?.slice(1)}
          </span>
          <span
            className={`before:content-[''] before:w-[3px] before:h-[3px] before:bg-white before:absolute before:top-1/2 before:rounded-[50%] before:-translate-y-1/2 before:-left-[10px] text-white/75 relative ml-5 ${
              customStyle
                ? "text-xs ms:text-[15px]"
                : "text-[11px] ms:text-[13px]"
            }`}
          >
            {vote_average?.toFixed(1)}
          </span>
        </div>

        <h3
          className={`inline-block font-medium mt-[3px] text-transparent bg-gradient-custom bg-clip-text bg-no-repeat transition-all duration-800 ease-out ${
            customStyle ? "text-[15px] ms:text-2xl" : "text-sm ms:text-lg "
          }`}
          style={{
            backgroundSize: "220% 100%",
            backgroundPosition: isTextHovered ? "0% 50%" : "100% 50%"
          }}
          onMouseEnter={() => setIsTextHovered(true)}
          onMouseLeave={() => setIsTextHovered(false)}
        >
          {title || name}
        </h3>
      </div>
    </>
  );
};

export default MovieInfo;
