import { Video } from "@/interfaces/Media";
import { atom } from "jotai";

interface TrailerState {
  isOpen: boolean;
  videos: Video[] | null;
}

export const trailerAtom = atom<TrailerState>({
  isOpen: false,
  videos: null
});
