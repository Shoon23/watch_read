import React, { useEffect } from "react";
import MovieHeader from "@/components/Movie/MovieHeaders";
import { GetServerSideProps } from "next";
import { movieProvider } from "@/utils/providers";
import MoviePanel from "@/components/Movie/MoviePanel";
import PaginationMovie from "@/components/Movie/PaginationMovies";
import { useRouter } from "next/router";

type Props = {
  searchResult: {
    currentPage: number;
    hasNextPage: boolean;
    results: any[];
  };
  page: string;
  searchKey: string;
};

function search({ searchResult, searchKey, page }: Props) {
  const router = useRouter();
  const prevPage = () => {
    router.push(
      `/movie-tvshow/search?searchKey=${searchKey}&page=${Number(page) - 1}`
    );
  };
  const nextPage = () => {
    router.push(
      `/movie-tvshow/search?searchKey=${searchKey}&page=${Number(page) + 1}`
    );
  };

  return (
    <main>
      <MovieHeader title={"Search result: " + searchKey} />
      <MoviePanel movies={searchResult.results} />
      <PaginationMovie
        prevPage={prevPage}
        nextPage={nextPage}
        pageInfo={{
          currentPage: searchResult.currentPage,
          hasNextPage: searchResult.hasNextPage,
        }}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { searchKey, page } = context.query;
  const { results, ...pageInfo } = await movieProvider.search(
    searchKey as string,
    Number(page)
  );

  const filteredResults = results.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, val]) => val !== undefined)
    )
  );

  return {
    props: {
      searchKey,
      page,
      searchResult: { ...pageInfo, results: filteredResults },
    },
  };
};

export default search;
