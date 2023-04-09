import React from "react";
import MangaHeader from "@/components/Manga/MangaHeader";
import axios from "axios";
import { GetServerSideProps } from "next";
import MangaPanel from "@/components/Manga/MangaPanel";

type Props = {
  result: any;
  title: string;
};

function search({ result, title }: Props) {
  return (
    <main>
      <MangaHeader title={`Result: ${title}`} />
      <MangaPanel manga={result} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const title = context.query.title as string;

  const res = await axios.get(
    `https://api.mangadex.org/manga?title=${title}&includes[]=cover_art`
  );

  return {
    props: {
      result: res.data.data,
      title,
    },
  };
};

export default search;
