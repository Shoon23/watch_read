import React, { useEffect } from "react";
import Link from "next/link";
import { MovieType, TvShowsType } from "@/types/movieTypes";

type Props = {
  details: MovieType & TvShowsType;
};

function MovieCard({ details }: Props) {
  return (
    <Link
      href={`/movie-tvshow/${details.id}`}
      key={details.id}
      className="w-[340px] h-[633px] lg:w-80 card bg-base-200 shadow-xl cursor-pointer"
    >
      <figure>
        <img src={details.image} alt="Anime" className="h-[481px]" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{details.title}</h2>
        <p>{details.type}</p>
        <p>{`Duration: ${details.duration}` || `Seasons: ${details.season}`}</p>
        <p>{details.releaseDate || `Latest: ${details.latestEpisode}`}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
