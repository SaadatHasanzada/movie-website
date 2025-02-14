import { AXIOS } from "./axios";

export const getTrendingMedia = async () => {
  return Promise.all([
    AXIOS.get("/trending/movie/week?language=en-US"),
    AXIOS.get("/trending/tv/week?language=en-US")
  ]);
};
