import { GetServerSideProps } from "next";
import React from "react";
import KdramaHeader from "@/components/Kdrama/KdramaHeader";
import KdramPanel from "@/components/Kdrama/KdramaPanel";
import { useRouter } from "next/router";
import PaginationButtonsK from "@/components/Kdrama/PaginationButtonsK";
import axios from "axios";
type Props = {
  kdramas: {
    currentPage: number;
    hasNextPage: boolean;
    results: Array<{
      id: string;
      title: string;
      url: string;
      image: string;
    }>;
  };
};

function index({ kdramas }: Props) {
  const router = useRouter();

  const prevPage = () => {
    router.push(`/kdrama`);
  };
  const nextPage = () => {
    router.push(`/kdrama`);
  };

  return (
    <main className="min-h-screen">
      <KdramaHeader title={"Kdrama"} />
      <div className="my-2"></div>
      <KdramPanel kdrama={kdramas.results} />
      <PaginationButtonsK
        prevPage={prevPage}
        nextPage={nextPage}
        pageInfo={{ currentPage: 3, hasNextPage: true }}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const idxPage = Math.floor(Math.random() * 2);

  const randomKeyWord = ["romance", "2022", "revenge"];
  const idxKeyWord = Math.floor(Math.random() * randomKeyWord.length);

  const res = await axios.get(
    `https://api.consumet.org/movies/viewasian/${randomKeyWord[idxKeyWord]}?page=${idxPage}`
  );

  return {
    props: {
      kdramas: res.data,
    },
  };
};

export default index;
