import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { kdramaProvider } from "@/utils/providers";
import KdramaEpisodePanel from "@/components/Kdrama/KdramaEpisodePanel";
import splitEpisodes from "@/utils/splitEpisodes";

type Props = {
  kdramaInfo: {
    id: string;
    title: string;
    otherNames: string[];
    image?: string;
    description: string;
    genre: string[];
    director: string;
    country: string;
    releaseDate: string;
    img: string;
  };
  episode: {
    id: string;
    title: string;
    episode: string;
    url: string;
  }[];
  episodesList: any[][];
};
function WatchPage({ episode, kdramaInfo, episodesList }: Props) {
  const [currentEpisodeList, setCurrentEpisodeList] = useState<number>(0);

  return (
    <main className="min-h-screen flex flex-col items-center bg-base-200">
      <h1 className="h1 my-1 text-lg">{kdramaInfo.title}</h1>
      <h1 className="my-1">{episode[0].title}</h1>
      <section style={{ width: 950, height: 650, overflow: "hidden" }}>
        <iframe
          scrolling="no"
          width={1000}
          height={695}
          src={episode[0].url}
          allow="picture-in-picture fullscreen"
          className="relative bottom-40 right-6"
        ></iframe>
      </section>
      <KdramaEpisodePanel
        episodes={episodesList}
        setCurrentEpisodeList={setCurrentEpisodeList}
        currentEpisodeList={currentEpisodeList}
        kdramaId={kdramaInfo.id}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const episodeNum = context.query.episode;
  const kdramaId = context.query.id as string;

  const fetchKdramaInfo = await kdramaProvider.fetchMediaInfo(kdramaId);

  const { episodes, ...kdramaInfo } = fetchKdramaInfo;

  const findEpisode = episodes?.filter((item) => item.episode === episodeNum);

  const episodesList = splitEpisodes(episodes as [], 25);

  return {
    props: {
      episode: findEpisode,
      kdramaInfo,
      episodesList,
    },
  };
};

export default WatchPage;
