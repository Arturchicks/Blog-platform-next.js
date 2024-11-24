import Markdown from "react-markdown"
import React, { useEffect, useState } from "react"
import Favorites from "entities/article/ui/article/ui/favorites"
import { Tags } from "entities/article/ui/article/ui/tagList"
import {
  useGetArticleQuery,
  useGetCurrentUserQuery,
  useSetLikeMutation,
  useDeleteArticleMutation,
} from "shared/redux/api"
import { CircularProgress, Theme, Box, Button } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useTheme } from "@emotion/react"
import { useSelector } from "react-redux"
import { store } from "shared/redux"
import { format } from "date-fns"

const avatar = require("../../shared/assets/avatar.png")

export const ArticlePage: React.FC = () => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(`${slug}`)
  const { data: userData } = useGetCurrentUserQuery(null)
  const [load, setLoad] = useState<boolean>(false)
  const [image, setImage] = useState<string | undefined>(data?.article.author.image)
  const { changed } = useSelector((state: ReturnType<typeof store.getState>) => state.local)
  const [setLike] = useSetLikeMutation()
  const [del] = useDeleteArticleMutation()
  const theme = useTheme() as Theme
  const navigate = useNavigate()
  const handleDelete = async () => {
    await del(slug)
    navigate("/articles")
  }

  useEffect(() => {
    if (slug) {
      if (changed.includes(slug)) {
        setImage(avatar)
        setLoad(true)
      } else {
        if (data?.article.author.image) setImage(data.article.author.image)
      }
    }
  }, [data])

  return !data ? (
    <CircularProgress className="mx-auto" />
  ) : (
    <Box
      className="max-h-[85vh] xs:w-[90vw] sm:w-[60vw] rounded-md mx-auto animate-display overflow-x-hidden relative"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <Box className="flex flex-col rounded-xl xs:p-[2vw] sm:p-3 font-sans animate-display overflow-hidden">
        <Box className="flex w-[100%] justify-between">
          <Box className="flex max-w-[60%] items-center sm:w-auto">
            <h3 className="text-[#1890FF] text-xl inline-block s:whitespace-nowrap text-clamp-xl max-h-[100%] max-w-[100%] text-ellipsis overflow-hidden">
              {data.article.title.trim() || "Untitled"}
            </h3>
            <Favorites
              count={data.article.favoritesCount}
              liked={data.article.favorited}
              slug={data.article.slug}
              onToggleLike={setLike}
              className="inline-block min-w-3 text-clamp"
            />
          </Box>
          <Box className="flex w-auto xs:gap-1 gap-2 justify-end max-w-[50%] min-w-[40%]">
            <Box className="flex flex-col text-right w-[80%] justify-center overflow-hidden">
              <Box className="overflow-hidden text-ellipsis" sx={{ fontSize: "clamp(14px, 2vw, 16px)" }}>
                {data.article.author.username}
              </Box>
              <Box sx={{ color: "text.primary", fontSize: "clamp(12px, 1vw, 12px)" }}>
                {format(data.article.createdAt, "PP")}
              </Box>
            </Box>
            <div className="min-h-[46px] min-w-[46px] max-w-[46px] max-h-[46px]">
              {!load && <CircularProgress color="info" />}
              <img
                src={image}
                onLoad={() => setLoad(true)}
                alt="avatar"
                style={{ display: load ? "block" : "none" }}
                className="rounded-[50%] animate-display min-w-[46px] max-w-[46px] max-h-[46px] min-h-[46px]"
              />
            </div>
          </Box>
        </Box>
        {(data.article.tagList.length && <Tags tagList={data.article.tagList} />) || null}
        <Box
          className="overflow-hidden"
          sx={{ color: "text.primary", display: "flex", gap: "1em", justifyContent: "space-between" }}
        >
          <p className="text-[12px]">{data.article.description}</p>
        </Box>
        {data.article.author.username === userData?.user.username && (
          <Box sx={{ display: "flex", gap: "8px", justifyContent: "end" }}>
            <Button color="error" variant="outlined" sx={{ textTransform: "capitalize" }} onClick={handleDelete}>
              Delete
            </Button>
            <Button
              color="success"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
              onClick={() => navigate(`/edit-article/${slug}`)}
            >
              Edit
            </Button>
          </Box>
        )}
      </Box>
      <section className="p-[2vw] sm:p-3 break-words text-clamp">
        <Markdown className="markdown">{data.article.body}</Markdown>
      </section>
    </Box>
  )
}
