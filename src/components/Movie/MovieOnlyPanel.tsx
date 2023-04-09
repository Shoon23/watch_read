import React from "react";
import MoviePanel from "./MoviePanel";
import { MovieType, TvShowsType } from "@/types/movieTypes";

type Props = {
  recentMovies: Array<MovieType & TvShowsType>;
  popularMovies: Array<MovieType & TvShowsType>;
};

function MovieOnlyPanel({ recentMovies, popularMovies }: Props) {
  return (
    <>
      {/* Popular Movies Panel Start */}
      <h1 className="pl-3 my-2 shadow-lg text-3xl bg-success text-white rounded-lg px-3 mx-3">
        Popular Movies
      </h1>
      <MoviePanel movies={popularMovies} />
      {/* Popular Movies Panel End */}

      {/* Recent Movies Panel Start */}
      <h1 className="pl-3 my-2 shadow-lg text-3xl bg-primary text-white rounded-lg px-3 mx-3">
        Recent Movies
      </h1>
      <MoviePanel movies={recentMovies} />
      {/* Recent Movies Panel End */}
    </>
  );
}

export default MovieOnlyPanel;
