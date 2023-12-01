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

interface IGetDetailProps {
  id: number;
}

export interface IGetMovieDetailResult {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export const getMovieDetail = async ({ id }: IGetDetailProps) => {
  const data = await axios
    .get(`${BASE_URL}/movie/${id}?language=en-US`, config)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};

export interface IGetTvShowDetailResult {
  adult: boolean;
  backdrop_path: string;
  created_by: string[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  name: string;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export const getTvShowDetail = async ({ id }: IGetDetailProps) => {
  const data = await axios
    .get(`${BASE_URL}/tv/${id}?language=en-US`, config)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};

interface IGetCreditsProps {
  id: number;
}

export interface IGetCreditsResult {
  id: number;
  cast: {
    gender: number;
    id: number;
    name: string;
    original_name: string;
    profile_path: string;
    character: string;
    order: number;
  }[];
  crew: {
    gender: number;
    id: number;
    name: string;
    original_name: string;
    profile_path: string;
    department: string;
    job: string;
  }[];
}

export const getMovieCredits = async ({ id }: IGetCreditsProps) => {
  const data = await axios
    .get(`${BASE_URL}/movie/${id}/credits?language=en-US`, config)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};

export const getTvCredits = async ({ id }: IGetCreditsProps) => {
  const data = await axios
    .get(`${BASE_URL}/tv/${id}/credits?language=en-US`, config)
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};

export interface IGetTvSeasonDetailResult {
  _id: string;
  air_date: string;
  episodes: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: {
      department: string;
      job: string;
      credit_id: string;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
    guest_stars: {
      character: string;
      credit_id: string;
      order: number;
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
    }[];
  }[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface IGetTvSeasonDetailProps {
  tvShowId: number;
  seasonNumber: number;
}

export const getTvSeasonDetail = async ({
  tvShowId,
  seasonNumber,
}: IGetTvSeasonDetailProps) => {
  const data = await axios
    .get(
      `${BASE_URL}/tv/${tvShowId}/season/${seasonNumber}?language=en-US`,
      config
    )
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};

export interface IGetMultiSearchResult {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}

interface IGetMultiSearchProps {
  query: string;
}

export const getMultiSearch = async ({ query }: IGetMultiSearchProps) => {
  const data = await axios
    .get(
      `${BASE_URL}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      config
    )
    .then((response) => response.data)
    .catch((e) => {
      throw e;
    });
  return data;
};
