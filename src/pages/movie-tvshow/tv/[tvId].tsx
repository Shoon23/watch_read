import { GetServerSideProps } from "next";
import React from "react";
import MovieHeroPage from "@/components/Movie/MovieHeroPage";
import { movieProvider } from "@/utils/providers";
import { EpisodeType, MovieInfoType } from "@/types/movieTypes";
import MoviePanel from "@/components/Movie/MoviePanel";
import splitEpisodesBySeasons from "@/utils/splitEpisodesBySeaons";

type Props = {
  showInfo: MovieInfoType;
  episodes: EpisodeType;
};

function index({ showInfo, episodes }: Props) {
  return (
    <main>
      <MovieHeroPage otherInfo={showInfo} episodes={episodes} />

      <h1 className="pl-3 my-2 shadow-lg text-3xl bg-success text-white rounded-lg px-3 mx-3">
        Recommended
      </h1>
      <MoviePanel movies={showInfo.recommendations} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tvId } = context.query;
  const showInfo = await movieProvider.fetchMediaInfo(`tv/${tvId}`);
  const episodes = splitEpisodesBySeasons(showInfo.episodes as []);

  return {
    props: {
      showInfo,
      episodes,
    },
  };
};
export default index;
