export function imageURL(path: string | null) {
  if (path === null) return undefined;
  return `https://image.tmdb.org/t/p/w500${path}`;
}
