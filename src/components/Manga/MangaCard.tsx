import React from "react";
import Link from "next/link";
type Props = {
  details: any;
  fileName: any;
};

function MangaCard({ details, fileName }: Props) {
  return (
    <Link
      href={`/read/${details.id}`}
      key={details.id}
      className="w-[340px] h-[633px] lg:w-80 card bg-base-200 shadow-xl cursor-pointer"
    >
      <figure>
        <img
          src={`https://uploads.mangadex.org/covers/${details.id}/${fileName[0]?.attributes?.fileName}`}
          alt=""
          className="h-[481px]"
        />
      </figure>
      <div className="card-body">
        <h1 className="cart-title">{details.attributes.title.en}</h1>
        <p>{details.attributes.status}</p>
        <p>{details.attributes.year}</p>
      </div>
    </Link>
  );
}

export default MangaCard;
