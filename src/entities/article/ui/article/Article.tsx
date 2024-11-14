import React, { useEffect, useState } from "react"
import { IArticle } from "../../types/types"
import { formatDate } from "../../lib/formatDate"
import { formatTitle } from "entities/article/lib/formatTitle"
import Favorites from "./ui/favorites"
import { Tags } from "./ui/tagList"
import { useSetLikeMutation } from "shared/redux/api"
import { Box, CircularProgress, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"
import { change } from "shared/redux/local"
import { store } from "shared/redux"

const avatar = require("../../../../shared/assets/avatar.png")

const Article: React.FC<IArticle> = (props: IArticle) => {
  const { changed } = useSelector((state: ReturnType<typeof store.getState>) => state.local)
  const [image, setImage] = useState<string | undefined>(props.author.image)
  const [favorited, setFavorited] = useState<boolean>(props.favorited)
  const [favoritesCount, setFavoritesCount] = useState<number>(props.favoritesCount)
  const [load, setLoad] = useState<boolean | string>(false)
  const [setLike, result] = useSetLikeMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isPointer = useMediaQuery("(pointer: fine)")

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (load === "end" && changed) setImage(avatar)
    if (!load) {
      timer = setTimeout(() => {
        setImage(avatar)
        setLoad("end")
        dispatch(change(true))
      }, 1000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [load])

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
        <Box className="flex w-auto xs:gap-1 gap-2 justify-end max-w-[50%] min-w-[40%]">
          <Box
            sx={{ fontSize: "clamp(14px, 2vw, 16px)" }}
            className="flex flex-col text-right w-[80%] justify-center overflow-hidden"
          >
            <Box sx={{ fontSize: "clamp(14px, 2vw, 16px)" }} className="overflow-hidden text-ellipsis">
              {props.author.username}
            </Box>
            <Box sx={{ color: "text.primary", fontSize: "clamp(12px, 1vw, 12px)" }}>{formatDate(props.createdAt)}</Box>
          </Box>
          <div className="min-w-[46px] min-h-[46px] rounded-[50%]">
            {!load && <CircularProgress aria-busy="true" color="info" />}
            <img
              src={image}
              onLoad={() => setLoad(true)}
              alt="avatar"
              style={{ display: load ? "block" : "none" }}
              className=" min-w-[46px] max-w-[46px] max-h-[46px] min-h-[46px] rounded-[50%] animate-display"
            />
          </div>
        </Box>
      </Box>
      <Tags tagList={props.tagList} />
      <div className="overflow-hidden">
        <p className="h-[25px] overflow-hidden text-ellipsis">{props.description}</p>
      </div>
    </Box>
  )
}
export default Article
