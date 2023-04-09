import React from "react";
import Link from "next/link";
type Props = {
  details: {
    id: string;
    title: string;
    image: string;
    url: string;
    episodeNumber?: number;
    genres?: string[];
  };
};

function AnimeCard({ details }: Props) {
  return (
    <Link
      href={`/anime/${details.id}`}
      key={details.id}
      className="w-[340px] h-[633px] lg:w-80 card bg-base-200 shadow-xl cursor-pointer"
    >
      <figure>
        <img src={details.image} alt="Anime" className="h-[481px]" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{details.title}</h2>
        {details.genres ? (
          <p className="text-white flex flex-wrap gap-1">
            {details.genres?.map((genre: any) => (
              <span key={genre}>{genre}</span>
            ))}
          </p>
        ) : (
          <p className="text-white flex flex-wrap gap-1">
            Episodes: {details.episodeNumber}
          </p>
        )}
      </div>
    </Link>
  );
}

export default AnimeCard;
