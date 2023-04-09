import React from "react";
import axios from "axios";
import AnimePanel from "@/components/Anime/AnimePanel";
import Link from "next/link";
import AnimeHeader from "@/components/Anime/AnimeHeader";
import { PopularAnimeType, RecentAnimeType } from "@/types/animeTypes";
import { animeProvider } from "@/utils/providers";

type Props = {
  popular: Array<PopularAnimeType>;
  recent: Array<RecentAnimeType>;
};

function index({ popular, recent }: Props) {
  return (
    <main className="min-h-screen">
      <AnimeHeader title={"Anime"} />
      <h1 className="text-primary my-2 text-4xl pl-3">Recent</h1>
      <AnimePanel anime={recent} />
      <Link href={`/anime/recents/${2}`} className="btn btn-primary flex my-2">
        View More
      </Link>
      <h1 className="text-accent my-2 text-4xl pl-3">Popular</h1>
      <AnimePanel anime={popular} />
      <Link href={`/anime/popular/${2}`} className="btn  btn-accent flex my-2">
        View More
      </Link>
    </main>
  );
}

export async function getServerSideProps() {
  const resultTop = await animeProvider.fetchTopAiring();
  const resultRecent = await animeProvider.fetchRecentEpisodes();

  return {
    props: { popular: resultTop.results, recent: resultRecent.results },
  };
}

export default index;
