import React, { useState } from "react";
import MovieHeader from "@/components/Movie/MovieHeaders";
import { GetServerSideProps } from "next";
import { movieProvider } from "@/utils/providers";
import { MovieType, TvShowsType } from "@/types/movieTypes";
import MovieOnlyPanel from "@/components/Movie/MovieOnlyPanel";
import TvShowOnlyPanel from "@/components/Movie/TvShowOnlyPanel";

type Props = {
  recentMovies: Array<MovieType & TvShowsType>;
  popularMovies: Array<MovieType & TvShowsType>;
  recentTvShows: Array<TvShowsType & MovieType>;
  popularTvShows: Array<TvShowsType & MovieType>;
};

function index({
  recentMovies,
  popularMovies,
  recentTvShows,
  popularTvShows,
}: Props) {
  const [filter, setFilter] = useState("");

  return (
    <main>
      <MovieHeader title={""} />
      <div className="flex gap-2 mt-2 place-items-center">
        <h1 className="mb-2 text-2xl text-white">Filter: </h1>
        {["movies", "tvshows"].map((id) => (
          <button
            key={id}
            id={id}
            onClick={() => {
              if (filter === id) return setFilter("");
              setFilter(id);
            }}
            className={`mb-2 text-2xl btn ${
              filter === id ? `btn-active btn-ghost` : ` btn-outline`
            }`}
          >
            {id}
          </button>
        ))}
      </div>
      {(() => {
        switch (filter) {
          case "movies":
            return (
              <MovieOnlyPanel
                popularMovies={popularMovies}
                recentMovies={recentMovies}
              />
            );
          case "tvshows":
            return (
              <TvShowOnlyPanel
                recentTvShows={recentTvShows}
                popularTvShows={popularTvShows}
              />
            );
          default:
            return (
              <>
                <MovieOnlyPanel
                  popularMovies={popularMovies}
                  recentMovies={recentMovies}
                />

                <TvShowOnlyPanel
                  recentTvShows={recentTvShows}
                  popularTvShows={popularTvShows}
                />
              </>
            );
        }
      })()}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const recentMovies = await movieProvider.fetchRecentMovies();
  const popularMovies = await movieProvider.fetchTrendingMovies();
  const recentTvShows = await movieProvider.fetchRecentTvShows();
  const popularTvShows = await movieProvider.fetchTrendingTvShows();

  return {
    props: {
      recentMovies,
      popularMovies,
      recentTvShows,
      popularTvShows,
    },
  };
};

export default index;
