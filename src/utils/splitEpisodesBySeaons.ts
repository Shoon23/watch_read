export default function splitEpisodesBySeasons(arr: any[]) {
  const results: any = {};

  arr.forEach((item) => {
    const seasonNum = item.season;

    if (!results[seasonNum]) {
      results[seasonNum] = [];
    }
    results[seasonNum].push(item);
  });

  return results;
}
