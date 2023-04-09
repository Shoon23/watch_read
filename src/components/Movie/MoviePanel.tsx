import React from "react";
import MovieCard from "./MovieCard";
import { MovieType, TvShowsType } from "@/types/movieTypes";

type Props = {
  movies: Array<MovieType & TvShowsType>;
};

function MoviePanel({ movies }: Props) {
  return (
    <section className="pl-7 md:pl-2 md:pr-2 pt-1 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgd:gap-1 ">
      {movies?.map((details) => (
        <MovieCard key={details.id} details={details} />
      ))}
    </section>
  );
}

export default MoviePanel;
