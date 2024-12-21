import { DoubleTaptype } from "./types";

export const doubleTap: DoubleTaptype = (args): (() => void) => {
  let tapCount = 0;
  let timer: NodeJS.Timeout | undefined;
  const { setAnimation, setLike, setMethod, slug } = args;
  return () => {
    tapCount++;
    clearTimeout(timer);
    timer = setTimeout(() => {
      tapCount = 0;
      setAnimation("animate-none");
    }, 400);
    if (tapCount === 2) {
      if (slug) setLike({ slug, method: "POST" });
      setAnimation("animate-ping");
      setMethod((prev) => (prev === "POST" ? "DELETE" : "POST"));
    }
  };
};
