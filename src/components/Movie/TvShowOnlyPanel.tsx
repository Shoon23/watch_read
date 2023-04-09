import React from "react";
import MoviePanel from "./MoviePanel";
import { MovieType, TvShowsType } from "@/types/movieTypes";

type Props = {
  recentTvShows: Array<TvShowsType & MovieType>;
  popularTvShows: Array<TvShowsType & MovieType>;
};

function TvShowOnlyPanel({ recentTvShows, popularTvShows }: Props) {
  return (
    <>
      {/* Popular Tv Shows Panel Start */}
      <h1 className="pl-3 my-2 shadow-lg text-3xl bg-success text-white rounded-lg px-3 mx-3">
        Popular Tv Shows
      </h1>
      <MoviePanel movies={popularTvShows} />
      {/* Popular Tv Shows Panel End */}

      {/* Recent Tv Shows Panel Start */}
      <h1 className="pl-3 my-2 shadow-lg text-3xl bg-primary text-white rounded-lg px-3 mx-3">
        Recent Tv Shows
      </h1>
      <MoviePanel movies={recentTvShows} />
      {/* Recent Tv Shows Panel End */}
    </>
  );
}

export default TvShowOnlyPanel;
