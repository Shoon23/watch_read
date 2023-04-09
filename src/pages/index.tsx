import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const nav = [
    {
      logo: "K",
      name: "K-Drama",
      path: "/kdrama",
    },
    {
      logo: "A",
      name: "Anime",
      path: "/anime",
    },
    {
      logo: "M",
      name: "Movie",
      path: "/movie-tvshow",
    },
    {
      logo: "M",
      name: "Manga/Manhwa",
      path: "/read?page=1&offset=0",
    },
  ];
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="flex flex-col md:flex-row gap-2">
        {nav.map((nav: any) => (
          <>
            <Link href={nav.path}>
              <h1 className="text-9xl w-32 flex justify-center hover:border hover:border-primary h-32 cursor-pointer hover:scale-110">
                {nav.logo}
              </h1>
              <br />
              <h1 className="flex place-content-center"> {nav.name}</h1>
            </Link>
          </>
        ))}
      </section>
    </main>
  );
}
