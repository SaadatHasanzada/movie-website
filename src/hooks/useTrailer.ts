// hooks/useTrailer.ts

import { Video } from "../interfaces/Media";
import { trailerAtom } from "@/atoms/trailerAtom";
import { useSetAtom } from "jotai";

export const useTrailer = () => {
  const setTrailerState = useSetAtom(trailerAtom);

  const showTrailer = (videos: Video[]) => {
    setTrailerState({
      isOpen: true,
      videos
    });
  };

  const hideTrailer = () => {
    setTrailerState({
      isOpen: false,
      videos: null
    });
  };

  return { showTrailer, hideTrailer };
};
