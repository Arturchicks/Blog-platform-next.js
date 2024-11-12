import React, { MouseEventHandler, useEffect, useState } from "react"
import { IArticle } from "../../types/types"
import { formatDate } from "../../lib/formatDate"
import { formatTitle } from "entities/article/lib/formatTitle"
import Favorites from "./ui/favorites"
import { Tags } from "./ui/tagList"
import { useSetLikeMutation } from "shared/redux/api"
import { Box, CircularProgress, useMediaQuery } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import clsx from "clsx"

const avatar = require("../../assets/avatar.png")

const Article: React.FC<IArticle> = (props: IArticle) => {
  const [image, setImage] = useState(props.author.image)
  const [favorited, setFavorited] = useState<boolean>(props.favorited)
  const [favoritesCount, setFavoritesCount] = useState<number>(props.favoritesCount)
  const [load, setLoad] = useState<boolean>(false)
  const [setLike, result] = useSetLikeMutation()
  const navigate = useNavigate()
  const isPointer = useMediaQuery("(pointer: fine)")

  useEffect(() => {
    if (result.isSuccess) {
      console.log(result)
      setFavorited(result.data?.article.favorited)
      setFavoritesCount(result.data?.article.favoritesCount)
    }
  }, [result])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { tagName } = e.target as HTMLElement
    console.log(tagName)
    if (tagName === "INPUT" || tagName === "A") {
      e.preventDefault()
      return
    } else {
      navigate(`/slug/${props.slug}`)
    }
  }

  return (
    <Box
      onClick={handleClick}
      className={clsx(
        "flex flex-col cursor-pointer xs:h-[120px] xs:p-[2vw] sm:p-[15px] sm:h-[140px] xs:w-[90vw] sm:w-[60vw] rounded-md mx-auto animate-display overflow-x-hidden",
        isPointer ? "hover:bg-[#0288d11c]" : null
      )}
      sx={{ backgroundColor: "primary.main", color: "secondary.main" }}
    >
      <Box className="flex w-[100%] justify-between items-center max-h-[42px]">
        <div className="flex max-w-[60%] items-center">
          <h3 className=" text-[#1890FF] text-xl max-h-9 text-ellipsis overflow-hidden text-clamp-xl whitespace-nowrap">
            {props.title.length > 20 ? `${formatTitle(props.title)}...` : props.title}
          </h3>
          <Favorites
            onToggleLike={setLike}
            count={favoritesCount}
            liked={favorited}
            slug={props.slug}
            className="inline-block min-w-3 text-clamp pb-[2px]"
          />
        </div>
        <div className="flex xs:gap-1 sm:gap-2">
          <div className="flex flex-col text-right justify-center">
            <Box sx={{ fontSize: "clamp(14px, 2vw, 16px)" }}>{props.author.username}</Box>
            <Box sx={{ color: "text.primary", fontSize: "clamp(12px, 1vw, 12px)" }}>{formatDate(props.createdAt)}</Box>
          </div>
          <div className="w-[46px] rounded-[50%]">
            {!load && <CircularProgress color="info" />}
            <img
              src={image}
              onError={() => setImage(avatar)}
              onLoad={() => setLoad(true)}
              alt="avatar"
              style={{ display: load ? "block" : "none" }}
              className="min-w-9 w-[46px] rounded-[50%] h-[100%] animate-display"
            />
          </div>
        </div>
      </Box>
      <Tags tagList={props.tagList} />
      <div className="overflow-hidden">
        <p className="h-[25px] overflow-hidden text-ellipsis">{props.description}</p>
      </div>
    </Box>
  )
}
export default Article
