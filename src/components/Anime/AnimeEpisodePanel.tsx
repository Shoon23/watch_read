import { AnimeInfoEpisodesType } from "@/types/animeTypes";
import Link from "next/link";
import React from "react";

type Props = {
  episodes: AnimeInfoEpisodesType[][];
  setCurrentEpisodeList: React.Dispatch<React.SetStateAction<number>>;
  currentEpisodeList: number;
};

function AnimeEpisodePanel({
  episodes,
  setCurrentEpisodeList,
  currentEpisodeList,
}: Props) {
  return (
    <section className="min-h-screen bg-base-200 flex flex-col px-14 gap-8">
      <div className="flex gap-3">
        {episodes.map((items, idx: number) => (
          <p
            onClick={() => setCurrentEpisodeList(idx)}
            key={idx}
            className={`cursor-pointer ${
              currentEpisodeList === idx && `text-primary`
            }`}
          >
            {items[0].number + "-" + items[items.length - 1].number}
          </p>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {episodes[currentEpisodeList].map((items) => {
          return (
            <Link
              href={`/anime/watch/${items.id}`}
              key={items.number}
              className="btn btn-active btn-ghost"
            >
              {items.number}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default AnimeEpisodePanel;
