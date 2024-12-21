import { useEffect, useState } from "react";
export const useMedia = (query: string) => {
  const [match, setMatch] = useState<boolean>(false);
  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handleMatch = () => setMatch(matchMedia.matches);
    matchMedia.addEventListener("change", handleMatch);
    return () => matchMedia.removeEventListener("change", handleMatch);
  }, [query]);
  return match;
};
