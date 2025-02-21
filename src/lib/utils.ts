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
