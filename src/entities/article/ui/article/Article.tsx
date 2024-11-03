import React, { useEffect, useState } from "react"
import { IArticle } from "../../types/types"
import { formatDate } from "../../lib/formatDate"
import { formatTitle } from "entities/article/lib/formatTitle"
import Favorites from "./ui/favorites"
import { Tags } from "./ui/tagList"
import { useGetArticleQuery, useSetLikeMutation } from "shared/redux/api"
import { CircularProgress } from "@mui/material"
import { Link, useParams } from "react-router-dom"
const avatar = require("../../assets/avatar.png")

const Article: React.FC<IArticle> = (props: IArticle) => {
  const [image, setImage] = useState(props.author.image)
  const [favorited, setFavorited] = useState<boolean>(props.favorited)
  const [favoritesCount, setFavoritesCount] = useState<number>(props.favoritesCount)
  const [load, setLoad] = useState<boolean>(false)
  const [setLike, result] = useSetLikeMutation()
  useEffect(() => {
    if (result.isSuccess) {
      setFavorited(result.data?.article.favorited)
      setFavoritesCount(result.data?.article.favoritesCount)
    }
  }, [result])
  return (
    <div className="flex flex-col w-[70vw] h-[140px] bg-white rounded-xl p-[10px] font-sans animate-display overflow-hidden">
      <div className="flex w-[100%] justify-between">
        <div className="flex gap-2">
          <Link
            to={`/slug/${props.slug}`}
            className="text-[#1890FF] text-xl pt-[8px] max-h-9 text-ellipsis overflow-hidden"
          >
            {props.title.length > 20 ? `${formatTitle(props.title)}...` : props.title}
          </Link>
          <Favorites count={favoritesCount} liked={favorited} slug={props.slug} onToggleLike={setLike} />
        </div>
        <div className="flex h-[46px] gap-2">
          <div className="flex flex-col text-right">
            <span>{props.author.username}</span>
            <span className="text-[#00000080] text-xs">{formatDate(props.createdAt)}</span>
          </div>
          <div className="w-[46px] rounded-[50%]">
            {!load && <CircularProgress />}
            <img
              src={image}
              onError={() => setImage(avatar)}
              onLoad={() => setLoad(true)}
              alt="avatar"
              style={{ display: load ? "block" : "none" }}
              className="w-[46px] rounded-[50%] h-[100%] animate-display"
            />
          </div>
        </div>
      </div>
      <Tags tagList={props.tagList} />
      <div className="mt-[20px] overflow-hidden">
        <p className="h-[25px]">{props.description}</p>
      </div>
    </div>
  )
}
export default Article
