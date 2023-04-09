import React from "react";
import MangaCard from "./MangaCard";

type Props = {
  manga: Array<any>;
};

function MangaPanel({ manga }: Props) {
  return (
    <section className="pl-7 md:pl-2 md:pr-2 pt-1 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgd:gap-1 mt-2">
      {manga.map((details) => {
        const fileName = details.relationships.filter(
          (item: any) => item.type === "cover_art"
        );

        return (
          <MangaCard key={details.id} details={details} fileName={fileName} />
        );
      })}
    </section>
  );
}

export default MangaPanel;
