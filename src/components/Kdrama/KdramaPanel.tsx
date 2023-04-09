import React from "react";
import KdramaCard from "./KdramaCard";
import { IMovieResult } from "@consumet/extensions";

type Props = {
  kdrama: Array<{
    id: string;
    title: string;
    url: string;
    image: string;
  }>;
};

function KdramPanel({ kdrama }: Props) {
  return (
    <section className="pl-7 md:pl-2 md:pr-2 pt-1 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgd:gap-1 ">
      {kdrama?.map((details) => (
        <KdramaCard key={details.id} details={details} />
      ))}
    </section>
  );
}

export default KdramPanel;
