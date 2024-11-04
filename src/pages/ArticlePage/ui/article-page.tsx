import Markdown from "react-markdown"
import React, { useState } from "react"
import { formatDate } from "entities/article/lib/formatDate"
import { formatTitle } from "entities/article/lib/formatTitle"
import Favorites from "entities/article/ui/article/ui/favorites"
import { Tags } from "entities/article/ui/article/ui/tagList"
import { useGetArticleQuery, useSetLikeMutation } from "shared/redux/api"
import { CircularProgress } from "@mui/material"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box"

export const ArticlePage: React.FC = (): JSX.Element => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(slug)
  const [load, setLoad] = useState<boolean>(false)
  const [setLike, result] = useSetLikeMutation()
  // const [image, setImage] = useState(data.author.image)

  return (
    data && (
      <Box
        className="h-[85vh] w-[70vw] rounded-md mx-auto animate-display overflow-x-hidden"
        sx={{ bgcolor: "primary.main", color: "secondary.main" }}
      >
        <Box className="flex flex-col w-[70vw] h-[140px] rounded-xl p-[10px] pr-[20px] pl-[20px] font-sans animate-display overflow-hidden">
          <Box className="flex w-[100%] justify-between">
            <Box className="flex gap-2">
              <h3 className="text-[#1890FF] text-xl pt-[8px] max-h-9 text-ellipsis overflow-hidden">
                {data.article.title.length > 20 ? `${formatTitle(data.article.title)}...` : data.article.title}
              </h3>
              <Favorites
                count={data.article.favoritesCount}
                liked={data.article.favorited}
                slug={data.article.slug}
                onToggleLike={setLike}
              />
            </Box>
            <Box className="flex h-[46px] gap-2">
              <Box className="flex flex-col text-right">
                <span>{data.article.author.username}</span>
                <span className="text-xs">{formatDate(data.article.createdAt)}</span>
              </Box>
              <Box className="w-[46px] rounded-[50%]">
                {!load && <CircularProgress />}
                <img
                  src={data.article.author.image}
                  onLoad={() => setLoad(true)}
                  alt="avatar"
                  style={{ display: load ? "block" : "none" }}
                  className="w-[46px] rounded-[50%] h-[100%] animate-display"
                />
              </Box>
            </Box>
          </Box>
          <Tags tagList={data.article.tagList} />
          <Box className="mt-[20px] overflow-hidden" sx={{ color: "text.primary" }}>
            <p className="h-[35px] text-xs">{data.article.description}</p>
          </Box>
        </Box>
        <section className="p-5">
          <Markdown>{data.article.body}</Markdown>
        </section>
      </Box>
    )
  )
}
