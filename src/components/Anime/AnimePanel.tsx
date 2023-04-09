import React from "react";
import AnimeCard from "./AnimeCard";

type Props = {
  anime: Array<{
    id: string;
    title: string;
    image: string;
    url: string;
    episodeNumber?: number;
    genres?: string[];
    subOrDub?: string;
  }>;
};

function AnimePanel({ anime }: Props) {
  return (
    <section className="pl-7 md:pl-2 md:pr-2 pt-1 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgd:gap-1 ">
      {anime?.map((details) => (
        <AnimeCard details={details} />
      ))}
    </section>
  );
}

export default AnimePanel;
