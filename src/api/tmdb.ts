import { AXIOS } from "./axios";

export const getTrendingMedia = async () => {
  return Promise.all([
    AXIOS.get("/trending/movie/week?language=en-US"),
    AXIOS.get("/trending/tv/week?language=en-US")
  ]);
};
export const getMediaVideoById = async (id: number, type: "movie" | "tv") => {
  if (type === "movie") {
    return AXIOS.get(`/movie/${id}/videos`);
  }
  return AXIOS.get(`/tv/${id}/videos`);
};
