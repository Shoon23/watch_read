import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";

type ChapterType = {
  [key: string]: {
    chapter: string;
    id: string;
    others: string[];
    count: number;
  };
};

// .none.chapters

type Props = {
  chapterNumber: string;
  chapterDetails: {
    result: string;
    baseUrl: string;
    chapter: {
      hash: string;
      data: string[];
      dataSaver: string[];
    };
  };
  title: string;
  chaptersOrVolume: any;
  mangaId: string;
  volume: string;
};

function index({
  chapterNumber,
  chapterDetails,
  title,
  chaptersOrVolume,
  mangaId,
  volume,
}: Props) {
  const baseUrl = chapterDetails.baseUrl;
  const hash = chapterDetails.chapter.hash;

  const router = useRouter();

  const handlePrev = () => {
    const prevChapterNum: keyof ChapterType = Number(chapterNumber) - 1;

    let chapterId;
    let volumeNumber: any = volume;

    if (volume) {
      //create a list in the volume chapters
      const chapters = Object.keys(chaptersOrVolume[volume].chapters);
      //get the last item in list in the volume chapters
      const lastChapter = chapters[Object.keys(chapters).length - 1];

      if (Number(chapterNumber) <= Number(lastChapter)) {
        volumeNumber = Number(volume) - 1;
        chapterId = chaptersOrVolume[volumeNumber].chapters[prevChapterNum].id;
      } else {
        chapterId = chaptersOrVolume[volume].chapters[prevChapterNum].id;
      }
    } else {
      chapterId = chaptersOrVolume.none.chapters[prevChapterNum].id;
    }

    router.push(
      `/read/chapter/${chapterId}?num=${prevChapterNum}&mangaId=${mangaId}&volume=${volumeNumber}`
    );
  };

  const handleNext = () => {
    const nextChapterNum: keyof ChapterType = Number(chapterNumber) + 1;
    let chapterId;
    let volumeNumber: any = volume;

    if (volume) {
      //create a list in the volume chapters
      const chapters = Object.keys(chaptersOrVolume[volume].chapters);
      //get the last item in list in the volume chapters
      const lastChapter = chapters[Object.keys(chapters).length - 1];

      if (Number(chapterNumber) >= Number(lastChapter)) {
        volumeNumber = Number(volume) + 1;
        chapterId = chaptersOrVolume[volumeNumber].chapters[nextChapterNum].id;
      } else {
        chapterId = chaptersOrVolume[volume].chapters[nextChapterNum].id;
      }
    } else {
      chapterId = chaptersOrVolume.none.chapters[nextChapterNum].id;
    }

    router.push(
      `/read/chapter/${chapterId}?num=${nextChapterNum}&mangaId=${mangaId}&volume=${volumeNumber}`
    );
  };

  const handleDisableNext = () => {
    if (volume) {
      const lastVolume =
        Object.keys(chaptersOrVolume)[Object.keys(chaptersOrVolume).length - 1];
      const lastChapInlastVolume = Object.keys(
        chaptersOrVolume[lastVolume].chapters
      )[Object.keys(chaptersOrVolume[lastVolume].chapters).length - 1];
      if (lastChapInlastVolume === chapterNumber) {
        return true;
      }
    }

    return undefined;
  };

  return (
    <main className="min-h-screen md:flex md:flex-col md:items-center">
      <section className="flex flex-col items-center mb-3 gap-1">
        <h1 className="text-3xl">{title}</h1>
        <h1>{"Chapter " + chapterNumber}</h1>
        <div className="btn-group grid grid-cols-2">
          <button
            disabled={Number(chapterNumber) === 0}
            onClick={handlePrev}
            className="btn btn-small btn-outline"
          >
            Previous Chapter
          </button>
          <button
            disabled={handleDisableNext()}
            onClick={handleNext}
            className="btn btn-small btn-outline"
          >
            Next Chapter
          </button>
        </div>
      </section>
      <section className="mb-3 flex flex-col items-center">
        {chapterDetails?.chapter?.data.map((image) => (
          <img key={image} src={`${baseUrl}/data/${hash}/${image}`} alt="" />
        ))}
      </section>

      <section className="mb-3 p-2">
        <div className="btn-group grid grid-cols-2">
          <button
            disabled={Number(chapterNumber) === 0}
            onClick={handlePrev}
            className="btn btn-outline"
          >
            Previous Chapter
          </button>
          <button
            disabled={handleDisableNext()}
            onClick={handleNext}
            className="btn btn-outline"
          >
            Next Chapter
          </button>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chapterId = context.query.chapterId;
  const num = context.query.num;
  const mangaId = context.query.mangaId;
  const volume = context.query.volume;

  const res = await axios.get(
    `https://api.mangadex.org/at-home/server/${chapterId}`
  );

  const mangaVolume = await axios.get(
    `https://api.mangadex.org/manga/${mangaId}/aggregate`
  );

  return {
    props: {
      chapterNumber: num,
      chapterDetails: res.data,
      chaptersOrVolume: mangaVolume.data.volumes,
      mangaId,
      volume,
    },
  };
};

export default index;
