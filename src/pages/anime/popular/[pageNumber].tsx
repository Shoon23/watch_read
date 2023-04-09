import React from "react";
import AnimeHeader from "@/components/Anime/AnimeHeader";
import axios from "axios";
import { GetServerSideProps } from "next";
import AnimePanel from "@/components/Anime/AnimePanel";
import { PopularAnimeType } from "@/types/animeTypes";
import { useRouter } from "next/router";
import PaginationButtons from "@/components/Anime/PaginationButtons";
import { animeProvider } from "@/utils/providers";

type Props = {
  popularAnime: {
    currentPage: number;
    hasNextPage: boolean;
    results: Array<PopularAnimeType>;
  };
};

function index({ popularAnime }: Props) {
  const router = useRouter();
  const { results, hasNextPage, currentPage } = popularAnime;
  const prevPage = () => {
    router.push(`/anime/popular/${currentPage - 1}`);
  };
  const nextPage = () => {
    router.push(`/anime/popular/${currentPage + 1}`);
  };

  return (
    <main className="min-h-screen">
      <AnimeHeader title={"Popular Anime"} />
      <h1 className="mt-2 pl-3">Page: {currentPage}</h1>
      <AnimePanel anime={results} />
      <section className="flex place-content-center my-1">
        <PaginationButtons
          prevPage={prevPage}
          nextPage={nextPage}
          pageInfo={{ hasNextPage, currentPage }}
        />
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageNumber = context.query.pageNumber;

  const popularAnime = await animeProvider.fetchTopAiring(Number(pageNumber));

  return {
    props: { popularAnime },
  };
};
export default index;
