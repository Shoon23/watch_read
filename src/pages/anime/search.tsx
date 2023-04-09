import AnimeHeader from "@/components/Anime/AnimeHeader";
import { GetServerSideProps } from "next";
import React from "react";
import axios from "axios";
import AnimePanel from "@/components/Anime/AnimePanel";
import { useRouter } from "next/router";
import PaginationButtons from "@/components/Anime/PaginationButtons";
import { animeProvider } from "@/utils/providers";
type Props = {
  searchResult: {
    currentPage: number;
    hasNextPage: boolean;
    results: Array<{
      id: string;
      title: string;
      url: string;
      image: string;
      releaseDate: string;
      subOrDub: string;
    }>;
  };
  searchKey: string;
  page: string;
};

function SearchPage({ searchResult, searchKey, page }: Props) {
  const router = useRouter();
  const { results, currentPage, hasNextPage } = searchResult;
  const prevPage = () => {
    router.push(
      `/anime/search?searchKey=${searchKey}&page=${Number(page) - 1}`
    );
  };
  const nextPage = () => {
    router.push(
      `/anime/search?searchKey=${searchKey}&page=${Number(page) + 1}`
    );
  };
  return (
    <main className="min-h-screen">
      <AnimeHeader title={`Search results: ${searchKey}`} />
      {results.length !== 0 ? (
        <AnimePanel anime={results} />
      ) : (
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl">Not Found</h1>
        </section>
      )}
      <PaginationButtons
        prevPage={prevPage}
        nextPage={nextPage}
        pageInfo={{ currentPage, hasNextPage }}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { searchKey, page } = context.query;

  const result = await animeProvider.search(searchKey as string, Number(page));

  return {
    props: {
      searchResult: result,
      searchKey,
      page,
    },
  };
};

export default SearchPage;
