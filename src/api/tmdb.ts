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

export const getRecommendedMedia = async () => {
  return Promise.all([
    AXIOS.get("/movie/top_rated?language=en-US"),
    AXIOS.get("/tv/top_rated?language=en-US")
  ]);
};
export const getAllMovies = async () => {
  return Promise.all([
    AXIOS.get("/movie/popular?language=en-US"),
    AXIOS.get("/movie/top_rated?language=en-US"),
    AXIOS.get("/movie/upcoming?language=en-US"),
    AXIOS.get("/movie/now_playing?language=en-US")
  ]);
};
export const getAllTvShows = async () => {
  return Promise.all([
    AXIOS.get("/tv/popular?language=en-US"),
    AXIOS.get("/tv/top_rated?language=en-US"),
    AXIOS.get("/tv/on_the_air?language=en-US"),
    AXIOS.get("/tv/airing_today?language=en-US")
  ]);
};

// Get Recommended media - Guest +
// Get Recommended media - User
