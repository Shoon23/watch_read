import { GetServerSideProps } from "next";
import React, { useState } from "react";
import splitEpisodes from "@/utils/splitEpisodes";
import { AnimeInfoEpisodesType, AnimeInfoType } from "@/types/animeTypes";
import { animeProvider } from "@/utils/providers";
import AnimeEpisodePanel from "@/components/Anime/AnimeEpisodePanel";

type Props = {
  animeInfo: AnimeInfoType;
  episodes: AnimeInfoEpisodesType[][];
};

function Anime({ animeInfo, episodes }: Props) {
  const [currentEpisodeList, setCurrentEpisodeList] = useState<number>(0);

  return (
    <main>
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={animeInfo.image}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{animeInfo.title}</h1>
            <p className="py-6">{animeInfo.description}</p>
            <p className=" flex flex-wrap gap-1">
              {animeInfo.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </p>
            <p>Status: {animeInfo.status}</p>
            <p>Episodes: {animeInfo.totalEpisodes}</p>
            <p>{animeInfo.type}</p>
          </div>
        </div>
      </section>
      <AnimeEpisodePanel
        episodes={episodes}
        currentEpisodeList={currentEpisodeList}
        setCurrentEpisodeList={setCurrentEpisodeList}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const animeId = context.query.animeId as string;

  const animeInformation = await animeProvider.fetchAnimeInfo(animeId);

  const { episodes, ...animeInfo } = animeInformation;

  const listEpisodes = splitEpisodes(episodes as AnimeInfoEpisodesType[], 100);

  return {
    props: { animeInfo, episodes: listEpisodes },
  };
};

export default Anime;
