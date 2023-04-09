import {
  EpisodeType,
  MovieInfoType,
  MovieServerType,
} from "@/types/movieTypes";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  otherInfo: MovieInfoType;
  movieServers?: MovieServerType[];
  episodes?: EpisodeType;
};

function MovieHeroPage({ otherInfo, movieServers, episodes }: Props) {
  const [season, setSeason] = useState<keyof EpisodeType>("1");
  return (
    <section className="hero min-h-screen flex flex-col justify-center gap-2">
      <div className="rounded-md shadow-lg  hero-content flex-col lg:flex-row bg-base-200">
        <img src={otherInfo.image} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{otherInfo.title}</h1>
          <p className="py-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            {otherInfo.description}
          </p>
          <p>{otherInfo.type}</p>
          <p>Release Date: {otherInfo.releaseDate}</p>
          <p className="flex gap-1">
            <span>Genres: </span>
            {otherInfo.genres.map((genre) => (
              <span key={genre}>{genre + ","}</span>
            ))}
          </p>
          <p className="flex gap-1">
            <span>Casts: </span>
            {otherInfo.casts.map((cast) => (
              <span key={cast}>{cast + ","}</span>
            ))}
          </p>
          <p>Production: {otherInfo.production}</p>
          <p>Country: {otherInfo.country}</p>
          <p>{otherInfo.duration}</p>
          {otherInfo.rating && <p>{`Rating: ${otherInfo?.rating}/10`}</p>}
        </div>
      </div>
      {movieServers && (
        <>
          <h1>Movie Servers</h1>
          <div className="flex gap-1 mt-2 justify-center text-white w-full px-12">
            {movieServers.map((server) => (
              <Link href={server.url} className="btn btn-outline btn-success">
                {server.name}
              </Link>
            ))}
          </div>
        </>
      )}

      {episodes && (
        <>
          <div className="flex-col md:flex-row flex gap-4  mt-3">
            {Object.keys(episodes).map((season: string, idx: number) => {
              return (
                <h1
                  onClick={() => setSeason(season)}
                  className={`text-2xl cursor-pointer`}
                >
                  {"Season: " + season}
                </h1>
              );
            })}
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            {episodes[season].map((details) => (
              <Link href={details.url} className="btn btn-active btn-accent">
                {details.number}
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default MovieHeroPage;
