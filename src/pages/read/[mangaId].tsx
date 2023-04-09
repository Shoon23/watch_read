import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import MangaHeroPage from "@/components/Manga/MangaHeroPage";
import MangaHeader from "@/components/Manga/MangaHeader";
import { useRouter } from "next/router";

type ChaptersType = {
  [key: string | number]: {
    chapter: string;
    id: string;
    others: [];
    count: number;
  };
};

type Props = {
  manga: any;
  volumes: {
    [key: string | symbol]: {
      volume: string;
      count: number;
      chapters: ChaptersType;
    };
  };
};

function MangaPage({ manga, volumes }: Props) {
  const [currentVolume, setCurrentVolume] = useState<keyof ChaptersType>("1");

  const manhwaKey = "none";
  const manhwaChapters = Object.values(volumes["none"]?.chapters || {});
  const router = useRouter();

  const handleGoToChapter = (
    chapterId: string,
    chapter: string,
    volume: string
  ) => {
    router.push(
      `/read/chapter/${chapterId}?num=${chapter}&mangaId=${manga.id}&volume=${volume}`
    );
  };

  return (
    <main>
      <MangaHeader title="Manga" />
      <MangaHeroPage manga={manga} />

      {manhwaKey in volumes ? (
        <section className="min-h-min p-10">
          <h1 className="text-3xl text-success mb-2">
            Chapters {manhwaChapters.length}
          </h1>
          <div className="grid grid-cols-6 gap-3">
            {manhwaChapters.map((details) => (
              <button
                key={details.id}
                onClick={() =>
                  handleGoToChapter(details.id, details.chapter, "")
                }
                className={`btn btn-outline`}
              >
                <span className="hidden md:block">Chapter</span>{" "}
                {details.chapter}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="min-h-min p-10">
            <h1 className="text-3xl text-success mb-2">Volumes</h1>
            <div className="flex flex-wrap gap-2">
              {Object.values(volumes).map((volumes) => (
                <button
                  key={volumes.volume}
                  onClick={() => setCurrentVolume(volumes.volume)}
                  className={`btn ${
                    volumes.volume === currentVolume
                      ? `btn-active btn-ghost`
                      : `btn-outline`
                  }`}
                >
                  {volumes.volume}
                </button>
              ))}
            </div>
          </section>
          <section className="min-h-min p-10">
            <h1 className="text-3xl text-success mb-2">
              Chapters for Volume {currentVolume}
            </h1>

            <div className="flex flex-wrap gap-2">
              {Object.values(volumes[currentVolume || "1"]?.chapters).map(
                (details) => {
                  return (
                    details.chapter !== "none" && (
                      <button
                        key={details.id}
                        onClick={() =>
                          handleGoToChapter(
                            details.id,
                            details.chapter,
                            currentVolume as string
                          )
                        }
                        className={`btn btn-outline`}
                      >
                        {"Chapter " + details.chapter}
                      </button>
                    )
                  );
                }
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

// 29c7aced-e2cc-4963-9180-4b1192193b9e

// 30460ee1-e7c1-4b1a-90a0-6861f9992c17

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mangaId = context.query.mangaId as string;

  const res = await axios.get(
    `https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art`
  );

  const mangaVolume = await axios.get(
    `https://api.mangadex.org/manga/${mangaId}/aggregate`
  );

  return {
    props: {
      manga: res.data.data,
      volumes: mangaVolume.data.volumes,
    },
  };
};
export default MangaPage;
