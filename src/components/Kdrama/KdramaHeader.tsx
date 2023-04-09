import React, { useState } from "react";

import Router, { useRouter } from "next/router";
type Props = {
  title: string | null;
};

function KdramaHeader({ title }: Props) {
  const [searchKey, setSearchKey] = useState<string>("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/kdrama/search?searchKey=${searchKey}&page=1`);
  };

  return (
    <form onSubmit={handleSubmit} className="px-3">
      <h1 className="mb-2 text-2xl">{title}</h1>
      <input
        type="text"
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Search Kdrama"
        className="input input-bordered  w-full"
      />
    </form>
  );
}

export default KdramaHeader;
