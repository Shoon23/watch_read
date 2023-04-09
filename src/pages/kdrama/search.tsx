import { GetServerSideProps } from "next";
import React from "react";
import KdramaHeader from "@/components/Kdrama/KdramaHeader";
import axios from "axios";
import PaginationButtonsK from "@/components/Kdrama/PaginationButtonsK";
import KdramPanel from "@/components/Kdrama/KdramaPanel";
import { useRouter } from "next/router";

type Props = {
  searchResult: {
    currentPage: number;
    hasNextPage: boolean;
    results: Array<{
      id: string;
      title: string;
      url: string;
      image: string;
    }>;
  };
  page: string;
  searchKey: string;
};

function SearchPage({ searchResult, page, searchKey }: Props) {
  const router = useRouter();

  const { results, currentPage, hasNextPage } = searchResult;
  const prevPage = () => {
    router.push(
      `/kdrama/search?searchKey=${searchKey}&page=${Number(page) - 1}`
    );
  };
  const nextPage = () => {
    `/kdrama/search?searchKey=${searchKey}&page=${Number(page) + 1}`;
  };
  return (
    <main className="min-h-screen">
      <KdramaHeader title={"Search result: " + searchKey} />
      <h1 className="ml-1 p-1">Page: {page}</h1>
      <KdramPanel kdrama={results} />
      <PaginationButtonsK
        pageInfo={{ currentPage, hasNextPage }}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, searchKey } = context.query;

  const res =
    await axios.get(`https://api.consumet.org/movies/viewasian/${searchKey}?page=${Number(
      page
    )}
  `);

  return {
    props: {
      searchResult: res.data,
      page,
      searchKey,
    },
  };
};

export default SearchPage;
