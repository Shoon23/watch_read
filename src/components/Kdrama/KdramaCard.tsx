import React, { useEffect } from "react";
import Link from "next/link";

type Props = {
  details: {
    id: string;
    title: string;
    url: string;
    image: string;
  };
};

function KdramaCard({ details }: Props) {
  return (
    <Link
      href={{
        pathname: `/kdrama/${details?.id}`,
        query: {
          img: details.image,
        },
      }}
      key={details.id}
      className="w-[340px] h-[633px] lg:w-80 card bg-base-200 shadow-xl cursor-pointer"
    >
      <figure>
        <img src={details.image} alt="Anime" className="h-[481px]" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{details.title as string}</h2>
      </div>
    </Link>
  );
}

export default KdramaCard;
