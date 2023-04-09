import { GetServerSideProps } from "next";
import React, { useState } from "react";
import axios from "axios";
import { AnimeInfoEpisodesType } from "@/types/animeTypes";
import splitEpisodes from "@/utils/splitEpisodes";
import AnimeEpisodePanel from "@/components/Anime/AnimeEpisodePanel";
import Link from "next/link";
import { useRouter } from "next/router";
import { animeProvider } from "@/utils/providers";
type Props = {
  episodeServers: Array<{
    name: string;
    url: string;
  }>;
  episodeList: AnimeInfoEpisodesType[][];
  currentEpisode: string;
};

function WatchAnime({ episodeServers, episodeList, currentEpisode }: Props) {
  const [serverIdx, setServerIdx] = useState<number>(0);
  const [currentEpisodeList, setCurrentEpisodeList] = useState<number>(0);
  const router = useRouter();

  const currenEpiNumber = Number(currentEpisode.slice(-5).split("-")[1]);

  const handleNextEpisode = () => {
    const nextEpisode =
      currentEpisode.split("episode")[0] + "episode-" + (currenEpiNumber + 1);

    router.push(`/anime/watch/${nextEpisode}`);
  };
  const handlePrevEpisode = () => {
    const prevEpisode =
      currentEpisode.split("episode")[0] + "episode-" + (currenEpiNumber - 1);
    router.push(`/anime/watch/${prevEpisode}`);
  };

  return (
    <main>
      <section className="min-h-screen flex flex-col place-items-center bg-base-200 p-10 gap-3">
        <h1 className="text-white">{currentEpisode}</h1>
        <iframe
          src={episodeServers[serverIdx].url}
          allowFullScreen={true}
          height={"578"}
          width={"80%"}
          allow=" picture-in-picture fullscreen"
        ></iframe>

        <div className="flex gap-1">
          {episodeServers.map((item, idx: number) => (
            <button
              onClick={() => setServerIdx(idx)}
              className={`btn btn-active ${
                serverIdx === idx ? `btn-primary` : `btn-ghost`
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="btn-group grid grid-cols-2 w-96 gap-1">
          <button
            onClick={handlePrevEpisode}
            disabled={currenEpiNumber === 1}
            className="btn btn-primary"
          >
            Previous
          </button>
          <button onClick={handleNextEpisode} className="btn btn-primary">
            Next
          </button>
        </div>
      </section>

      <AnimeEpisodePanel
        episodes={episodeList}
        setCurrentEpisodeList={setCurrentEpisodeList}
        currentEpisodeList={currentEpisodeList}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const episodeId = context.query.episodeId as string;
  const animeId = episodeId?.split("-episode")[0] as string;

  const episodeServers = await animeProvider.fetchEpisodeServers(episodeId);
  const animeInfo = await animeProvider.fetchAnimeInfo(animeId);

  const animeEpisodes = animeInfo.episodes as AnimeInfoEpisodesType[];
  const episodeList = splitEpisodes(animeEpisodes, 100);
  return {
    props: {
      episodeServers,
      episodeList,
      currentEpisode: episodeId,
    },
  };
};

export default WatchAnime;
