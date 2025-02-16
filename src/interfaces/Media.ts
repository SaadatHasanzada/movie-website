import { category } from "../types/category";

interface Thumbnail {
  regular: {
    small: string;
    medium: string;
    large: string;
  };
  trending?: {
    small: string;
    large: string;
  };
}

export interface Media {
  id: number;
  adult: boolean;
  media_type: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}
export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
// export interface Movie extends Media {
//   //   isBookmarked: boolean;
//   //   isTrending: boolean;
// }
// export interface TvSeries extends Media {}
