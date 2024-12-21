"use client";
import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { ArticleType } from "./types";
import { useSetLikeMutation } from "@/store/api";
import Favorites from "../favorites/favorites";
import { useRouter } from "next/navigation";
import Data from "../data/data";
import TagList from "../tag-list/tag-list";

const Article: React.FC<ArticleType> = ({
  author,
  favorited,
  slug,
  favoritesCount,
  title,
  ...props
}: ArticleType) => {
  const router = useRouter();
  const [image, setImage] = useState<string>(author.image);
  const [isFav, setIsFav] = useState<boolean>(favorited);
  const [favCount, setFavCount] = useState<number>(favoritesCount);
  const [load, setLoad] = useState<boolean | string>(false);
  const [setLike, { data }] = useSetLikeMutation();
  const dispatch = useDispatch();
  const isPointer = useMediaQuery("(pointer: fine)");
  // useEffect(() => {
  //   let timer: NodeJS.Timeout | undefined;
  //   if (changed.includes(props.author.username)) {
  //     setLoad(true);
  //     setImage(avatar);
  //   } else {
  //     if (!load) {
  //       timer = setTimeout(() => {
  //         setImage(avatar);
  //         dispatch(change(props.author.username));
  //       }, 2000);
  //     }
  //   }
  //   return () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [load]);

  useEffect(() => {
    if (data) {
      const { favorited, favoritesCount } = data.article;
      setIsFav(favorited);
      setFavCount(favoritesCount);
    }
  }, [data]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { tagName } = e.target as HTMLElement;
    if (tagName === "INPUT" || tagName === "A") {
      e.preventDefault();
      return;
    } else {
      router.push(`/article/${slug}`);
    }
  };

  return (
    <Box
      onClick={handleClick}
      className={clsx(
        "flex flex-col animate-display justify-between cursor-pointer xs:h-[120px] xs:p-[2vw] sm:p-[15px] sm:h-[160px] xs:w-[90vw] sm:w-[60vw] rounded-md mx-auto overflow-x-hidden",
        isPointer ? "hover:bg-[#636a8d1c]" : null
      )}
      sx={{
        bgcolor: "primary.main",
        boxShadow: "0px 0px 3px",
        color: "primary.200",
      }}
    >
      <Box>
        <Box className="flex w-[100%] justify-between items-center">
          <Box className="flex max-w-[60%] items-center">
            <h3 className=" text-[#1890FF] max-h-9 text-ellipsis overflow-hidden text-clamp whitespace-nowrap capitalize">
              {title.trim() || "Untitled"}
            </h3>
            <Favorites
              onToggleLike={setLike}
              count={favCount}
              liked={isFav}
              slug={slug}
            />
          </Box>
          <Box className="flex w-auto xs:gap-1 gap-2 justify-end max-w-[50%] min-w-[40%]">
            <Box className="flex flex-col text-right w-[80%] justify-center overflow-hidden">
              <Box
                sx={{
                  color: "text.primary",
                }}
                className="overflow-hidden text-ellipsis"
              >
                {author.username}
              </Box>
              <Data data={props.createdAt} />
            </Box>
            <div aria-busy="true" color="info">
              <img
                src={image}
                onLoad={() => setLoad(true)}
                alt="avatar"
                style={{ display: load ? "block" : "none" }}
                className="ImgSm rounded-[50%] animate-display border-[2px] border-solid border-[#1890FF]"
              />
            </div>
          </Box>
        </Box>
        <TagList tagList={props.tagList} />
      </Box>
      <Box
        className="overflow-hidden"
        sx={{ color: "text.primary", fontWeight: 200 }}
      >
        <p className="h-[25px] overflow-hidden text-ellipsis text-[16px]">
          {props.description}
        </p>
      </Box>
    </Box>
  );
};
export default Article;
