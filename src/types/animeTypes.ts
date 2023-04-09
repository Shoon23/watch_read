export type PopularAnimeType = {
  id: string;
  genres: Array<string>;
  title: string;
  image: string;
  url: string;
};

export type RecentAnimeType = {
  id: string;
  episodeId: number;
  episodeNumber: number;
  title: string;
  image: string;
  url: string;
};

export type AnimeInfoType = {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
};

export type AnimeInfoEpisodesType = {
  id: string;
  number: number;
  url: string;
};
