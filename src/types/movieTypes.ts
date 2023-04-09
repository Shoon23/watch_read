export type MovieType = {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate?: string;
  duration: string;
  type: string;
};

export type TvShowsType = {
  id: string;
  title: string;
  url: string;
  image: string;
  season?: string;
  latestEpisode: string;
  type: string;
};

export type MovieInfoType = {
  id: string;
  title: string;
  url: string;
  cover: string;
  image: string;
  description: string;
  type: string;
  releaseDate: string;
  genres: string[];
  casts: string[];
  tags: string[];
  production: string;
  country: string;
  duration: string;
  rating: string | number | null;
  recommendations: Array<MovieType & TvShowsType>;
};

export type MovieServerType = {
  name: string;
  url: string;
};

export type EpisodeType = {
  [key: string]: Array<{
    id: string;
    title: string;
    number: number;
    season: number;
    url: string;
  }>;
};
