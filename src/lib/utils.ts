import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Video } from "@/interfaces/Media";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const findTrailer = (videos: Video[] | null): Video | null => {
  if (!videos?.length) return null;
  const officialTrailer = videos.find(
    (video) =>
      video.type === "Trailer" &&
      video.official === true &&
      video.site === "YouTube"
  );
  if (officialTrailer) return officialTrailer;

  const anyTrailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  if (anyTrailer) return anyTrailer;

  return (
    videos.find(
      (video) => video.type === "Teaser" && video.site === "YouTube"
    ) || null
  );
};
