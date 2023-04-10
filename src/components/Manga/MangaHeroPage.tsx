import React from "react";
import Image from "next/image";

type Props = {
  manga: any;
};

function MangaHeroPage({ manga }: Props) {
  const fileName = manga.relationships.filter(
    (item: any) => item.type === "cover_art"
  );

  return (
    <section className="hero min-h-screen">
      <div className="hero-content p-0 mt-2 flex-col lg:flex-row">
        <img
          alt=""
          width={380}
          height={547}
          src={`https://uploads.mangadex.org/covers/${manga.id}/${fileName[0]?.attributes?.fileName}`}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{manga.attributes.title.en}</h1>
          <p className="flex gap-1 mt-1 flex-wrap">
            <span>Other Name: </span>
            {manga.attributes.altTitles.map(
              (title: { [key: string]: string }) => (
                <span className="min-w-min" key={Object.values(title)[0]}>
                  {Object.values(title)[0]},
                </span>
              )
            )}
          </p>
          <p className="py-6">
            {manga?.attributes?.description?.en?.split("**")[0] || ""}
          </p>
          <p>{manga.attributes.status}</p>
        </div>
      </div>
    </section>
  );
}

export default MangaHeroPage;
