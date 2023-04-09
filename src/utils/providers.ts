import { ANIME, MOVIES, MANGA } from "@consumet/extensions";

// new MANGA.ComicK();
// new MANGA.MangaDex();
// new MANGA.MangaHere();
// new MANGA.MangaPill();
// new MANGA.MangaReader();
// new MANGA.Mangapark();
// new MANGA.Mangasee123();

export const animeProvider = new ANIME.Gogoanime();
export const kdramaProvider = new MOVIES.ViewAsian();
export const movieProvider = new MOVIES.FlixHQ();
export const mangaProvider = new MANGA.MangaDex();
