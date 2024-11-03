import Markdown from "react-markdown"
import React, { useState } from "react"
import { formatDate } from "entities/article/lib/formatDate"
import { formatTitle } from "entities/article/lib/formatTitle"
import Favorites from "entities/article/ui/article/ui/favorites"
import { Tags } from "entities/article/ui/article/ui/tagList"
import { useGetArticleQuery, useSetLikeMutation } from "shared/redux/api"
import { CircularProgress } from "@mui/material"
import { useParams } from "react-router-dom"

export const ArticlePage: React.FC = (): JSX.Element => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(slug)
  const [load, setLoad] = useState<boolean>(false)
  const [setLike, result] = useSetLikeMutation()
  // const [image, setImage] = useState(data.author.image)

  return (
    data && (
      <div className="h-[85vh] w-[70vw] bg-white rounded-md mx-auto animate-display overflow-x-hidden">
        <div className="flex flex-col w-[70vw] h-[140px] bg-white rounded-xl p-[10px] pr-[20px] pl-[20px] font-sans animate-display overflow-hidden">
          <div className="flex w-[100%] justify-between">
            <div className="flex gap-2">
              <h3 className="text-[#1890FF] text-xl pt-[8px] max-h-9 text-ellipsis overflow-hidden">
                {data.article.title.length > 20 ? `${formatTitle(data.article.title)}...` : data.article.title}
              </h3>
              <Favorites
                count={data.article.favoritesCount}
                liked={data.article.favorited}
                slug={data.article.slug}
                onToggleLike={setLike}
              />
            </div>
            <div className="flex h-[46px] gap-2">
              <div className="flex flex-col text-right">
                <span>{data.article.author.username}</span>
                <span className="text-[#00000080] text-xs">{formatDate(data.article.createdAt)}</span>
              </div>
              <div className="w-[46px] rounded-[50%]">
                {!load && <CircularProgress />}
                <img
                  src={data.article.author.image}
                  onLoad={() => setLoad(true)}
                  alt="avatar"
                  style={{ display: load ? "block" : "none" }}
                  className="w-[46px] rounded-[50%] h-[100%] animate-display"
                />
              </div>
            </div>
          </div>
          <Tags tagList={data.article.tagList} />
          <div className="mt-[20px] overflow-hidden">
            <p className="h-[35px] text-[#00000080] text-xs">{data.article.description}</p>
          </div>
        </div>
        <section className="p-5">
          <Markdown>{data.article.body}</Markdown>
        </section>
      </div>
    )
  )
}
