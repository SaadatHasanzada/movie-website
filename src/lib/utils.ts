import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Video, Media } from "@/interfaces/Media";
import { AxiosResponse } from "axios";
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

export const handleError = (err: unknown) => {
  if (err instanceof Error) {
    const errorDetails = {
      message: err.message,
      name: err.name,
      stack: err.stack
    };

    if ("status" in err) {
      console.error("Supabase Error:", {
        ...errorDetails,
        status: (err as any).status
      });
    } else {
      console.error("Network Error:", errorDetails);
    }
  } else {
    console.error("Unknown Error:", err);
  }
  throw err;
};

interface MediaResponse {
  results: Media[];
}

export const addMediaType = (media: Media[], type: "movie" | "tv") => {
  return media.map((item) => {
    if (!item.media_type) {
      item.media_type = type;
    }
    return item;
  });
};

export const joinMedia = (
  media: [AxiosResponse<MediaResponse>, AxiosResponse<MediaResponse>]
): Media[] => {
  const [movies, tvShows] = media;
  const movieResults = addMediaType(movies.data.results, "movie");
  const tvResults = addMediaType(tvShows.data.results, "tv");
  const mediaResults: Media[] = [];

  const maxLength = Math.max(movieResults.length, tvResults.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < movieResults.length) mediaResults.push(movieResults[i]);
    if (i < tvResults.length) mediaResults.push(tvResults[i]);
  }
  return mediaResults;
};
