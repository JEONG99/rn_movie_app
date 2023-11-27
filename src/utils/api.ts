import axios from "axios";
import { API_KEY, BASE_URL } from "../../const";

const config = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export type movieCategories =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";

interface IGetMoviesProps {
  category: movieCategories;
}

export const getMovies = async ({ category }: IGetMoviesProps) => {
  const data = await axios
    .get(`${BASE_URL}/movie/${category}?language=en-US&page=1`, config)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};

export interface ITvShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTvShowsResult {
  page: number;
  results: ITvShow[];
  total_pages: number;
  total_results: number;
}

export type tvShowCategories =
  | "airing_today"
  | "on_the_air"
  | "popular"
  | "top_rated";

interface IGetTvShowsProps {
  category: tvShowCategories;
}

export const getTvShows = async ({ category }: IGetTvShowsProps) => {
  const data = await axios
    .get(`${BASE_URL}/tv/${category}?language=en-US&page=1`, config)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};

export interface IGetGenresResult {
  genres: { id: number; name: string }[];
}

interface IGetGenresProps {
  type: string;
}

export const getGenres = async ({ type }: IGetGenresProps) => {
  const data = await axios
    .get(`${BASE_URL}/genre/${type}/list?language=en`, config)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};
