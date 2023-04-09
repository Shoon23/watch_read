import { GetServerSideProps } from "next";
import React from "react";
import { movieProvider } from "@/utils/providers";
import { MovieInfoType, MovieServerType } from "@/types/movieTypes";
import MovieHeroPage from "@/components/Movie/MovieHeroPage";
import MoviePanel from "@/components/Movie/MoviePanel";

type Props = {
  movieInfo: MovieInfoType;
  movieServers: MovieServerType[];
};

function index({ movieInfo, movieServers }: Props) {
  return (
    <main>
      <MovieHeroPage otherInfo={movieInfo} movieServers={movieServers} />
      <h1 className="pl-3 my-2 shadow-lg text-3xl bg-success text-white rounded-lg px-3 mx-3">
        Recommendations
      </h1>
      <MoviePanel movies={movieInfo.recommendations} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.query.movieId as string;
  const movieInfo = await movieProvider.fetchMediaInfo(`movie/${movieId}`);

  const movieServers = await movieProvider.fetchEpisodeServers(
    "1",
    movieInfo.id
  );

  return {
    props: {
      movieInfo,
      movieServers,
    },
  };
};

export default index;
