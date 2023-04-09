import React from "react";
import { mangaProvider } from "@/utils/providers";
import { GetServerSideProps } from "next";
import axios from "axios";
import MangaHeader from "@/components/Manga/MangaHeader";
import MangaPanel from "@/components/Manga/MangaPanel";
import MangaPaginationButtons from "@/components/Manga/MangaPaginationButtons";
import { useRouter } from "next/router";

type Props = {
  manga: any[];
  page: string;
  offset: string;
};

function index({ manga, page, offset }: Props) {
  const router = useRouter();
  const nextPage = () => {
    router.push(`/read?page=${Number(page) + 1}&offset=${Number(offset) + 20}`);
  };

  const prevPage = () => {
    router.push(`/read?page=${Number(page) - 1}&offset=${Number(offset) - 20}`);
  };

  return (
    <main className="min-h-screen">
      <MangaHeader title="Manga" />
      <MangaPanel manga={manga} />
      <MangaPaginationButtons
        nextPage={nextPage}
        prevPage={prevPage}
        page={parseInt(page)}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, offset } = context.query;

  const res = await axios.get(
    `https://api.mangadex.org/manga?limit=20&offset=${offset}&includes[]=cover_art`
  );

  console.log(res.data.data[0].attributes);

  return {
    props: {
      manga: res.data.data,
      page,
      offset,
    },
  };
};

export default index;
