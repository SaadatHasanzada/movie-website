import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Video, Media } from "@/interfaces/Media";

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

export const joinMedia = (media) => {
  const [movies, tvShows] = media;
  const movieResults = movies.data.results;
  const tvResults = tvShows.data.results;
  movieResults.forEach((movie: Media) => {
    if (!movie.media_type) {
      movie.media_type = "movie";
    }
  });
  tvResults.forEach((tv: Media) => {
    if (!tv.media_type) {
      tv.media_type = "tv";
    }
  });
  const trendingData: Media[] = [];
  const maxLength = Math.max(movies.length, tvResults.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < movies.length) trendingData.push(movies[i]);
    if (i < tvResults.length) trendingData.push(tvResults[i]);
  }
  return trendingData;
};
