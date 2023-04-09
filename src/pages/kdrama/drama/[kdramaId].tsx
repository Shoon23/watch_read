import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { kdramaProvider } from "@/utils/providers";
import splitEpisodes from "@/utils/splitEpisodes";
import KdramaEpisodePanel from "@/components/Kdrama/KdramaEpisodePanel";

type KdramaInfoType = {
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

type Props = {
  kdramaInfo: KdramaInfoType;
  kdramaEpisodes: {
    id: string;
    title: string;
    episode: number;
    url: string;
  }[][];
};

function KdramaInfo({ kdramaInfo, kdramaEpisodes }: Props) {
  const [currentEpisodeList, setCurrentEpisodeList] = useState<number>(0);

  return (
    <main>
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={kdramaInfo.img}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{kdramaInfo.title as string}</h1>
            <p className="py-6">{kdramaInfo.description}</p>
            <p className=" flex flex-wrap gap-1">
              <span>Other Name: </span>
              {kdramaInfo.otherNames.map((name: string) => (
                <span key={name}>{name}</span>
              ))}
            </p>
            <p className=" flex flex-wrap gap-1">
              <span>Genre: </span>
              {kdramaInfo.genre.map((genre: string) => (
                <span key={genre}>{genre}</span>
              ))}
            </p>
            <p>Country: {kdramaInfo.country}</p>
            <p>Release Date: {kdramaInfo.releaseDate}</p>
            <p>Directed by: {kdramaInfo.director}</p>
          </div>
        </div>
      </section>
      <KdramaEpisodePanel
        currentEpisodeList={currentEpisodeList}
        episodes={kdramaEpisodes}
        setCurrentEpisodeList={setCurrentEpisodeList}
        kdramaId={kdramaInfo.id}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const kdramaId = context.query.kdramaId as string;
  const img = context.query.img;

  const fetchKdramInfo = await kdramaProvider.fetchMediaInfo(
    `drama/${kdramaId}`
  );

  const { episodes, ...kdramaInfo } = fetchKdramInfo;

  const kdramaEpisodes = splitEpisodes(episodes as [], 25);

  return {
    props: { kdramaInfo: { ...kdramaInfo, img }, kdramaEpisodes },
  };
};

export default KdramaInfo;
