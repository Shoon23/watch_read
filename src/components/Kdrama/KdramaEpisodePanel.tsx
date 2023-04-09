import { AnimeInfoEpisodesType } from "@/types/animeTypes";
import Link from "next/link";
import React from "react";

type Props = {
  episodes: {
    id: string;
    title: string;
    episode: number;
    url: string;
  }[][];
  setCurrentEpisodeList: React.Dispatch<React.SetStateAction<number>>;
  currentEpisodeList: number;
  kdramaId: string;
};

function KdramaEpisodePanel({
  episodes,
  setCurrentEpisodeList,
  currentEpisodeList,
  kdramaId,
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
            {items[0].episode + "-" + items[items.length - 1].episode}
          </p>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {episodes[currentEpisodeList].map((items) => {
          //   const kdramaId =
          //     items.id.split("/").slice(2)[0] +
          //     "_" +
          //     items.id.split("/").slice(2)[1];
          return (
            <Link
              href={{
                pathname: `/kdrama/watch`,
                query: { id: kdramaId, episode: items.episode },
              }}
              key={items.episode}
              className="btn btn-active btn-ghost"
            >
              {items.episode}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default KdramaEpisodePanel;
