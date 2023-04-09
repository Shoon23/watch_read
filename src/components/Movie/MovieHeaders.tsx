import React, { useState } from "react";

import Router, { useRouter } from "next/router";
type Props = {
  title: string;
};

function MovieHeader({ title }: Props) {
  const [searchKey, setSearchKey] = useState<string>("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/movie-tvshow/search?searchKey=${searchKey}&page=1`);
  };

  return (
    <form onSubmit={handleSubmit} className="px-3">
      {title && <h1 className="mb-2 text-2xl text-white">{title}</h1>}
      <input
        type="text"
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Search Movies/Tv Shows"
        className="input input-bordered  w-full"
      />
    </form>
  );
}

export default MovieHeader;
