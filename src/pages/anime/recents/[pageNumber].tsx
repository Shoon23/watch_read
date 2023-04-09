import React from "react";
import AnimeHeader from "@/components/Anime/AnimeHeader";
import axios from "axios";
import { GetServerSideProps } from "next";
import AnimePanel from "@/components/Anime/AnimePanel";
import { RecentAnimeType } from "@/types/animeTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import PaginationButtons from "@/components/Anime/PaginationButtons";
import { animeProvider } from "@/utils/providers";

type Props = {
  recentAnime: {
    currentPage: number;
    hasNextPage: boolean;
    results: Array<RecentAnimeType>;
  };
};

function index({ recentAnime }: Props) {
  const router = useRouter();
  const { results, hasNextPage, currentPage } = recentAnime;
  const prevPage = () => {
    router.push(`/anime/recents/${currentPage - 1}`);
  };
  const nextPage = () => {
    router.push(`/anime/recents/${currentPage - 1}`);
  };
  return (
    <main className="min-h-screen">
      <AnimeHeader title={"Recent Anime"} />
      <h1 className="mt-2 pl-3">Page: {currentPage}</h1>
      <AnimePanel anime={results} />
      <PaginationButtons
        prevPage={prevPage}
        nextPage={nextPage}
        pageInfo={{ hasNextPage, currentPage }}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageNumber = context.query.pageNumber;

  const recentAnime = await animeProvider.fetchRecentEpisodes(
    Number(pageNumber)
  );
  return {
    props: { recentAnime },
  };
};
export default index;
