import Markdown from "react-markdown"
import React, { useEffect, useState } from "react"
import { formatDate } from "entities/article/lib/formatDate"
import { formatTitle } from "entities/article/lib/formatTitle"
import Favorites from "entities/article/ui/article/ui/favorites"
import { Tags } from "entities/article/ui/article/ui/tagList"
import type { PopconfirmProps } from "antd"
import { CustomConfirm } from "./ui/popconfirm"
import { Button as Btn, message } from "antd"
import {
  useGetArticleQuery,
  useGetCurrentUserQuery,
  useSetLikeMutation,
  useDeleteArticleMutation,
} from "shared/redux/api"
import { CircularProgress, Theme, Box } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useTheme } from "@emotion/react"
import { useSelector } from "react-redux"
import { store } from "shared/redux"

const avatar = require("../../shared/assets/avatar.png")

export const ArticlePage: React.FC = (): JSX.Element => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(slug)
  const { data: userData } = useGetCurrentUserQuery(null)
  const [load, setLoad] = useState<boolean>(false)
  const [image, setImage] = useState<string>(data?.article.author.image)
  const { changed } = useSelector((state: ReturnType<typeof store.getState>) => state.local)
  const [setLike] = useSetLikeMutation()
  const [del] = useDeleteArticleMutation()
  const theme = useTheme() as Theme
  const navigate = useNavigate()
  const handleDelete = async () => {
    await del(slug)
    navigate("/articles")
  }
  const confirm: PopconfirmProps["onConfirm"] = () => {
    handleDelete()
    message.success("Article deleted")
  }

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e)
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

  return (
    data && (
      <Box
        className="max-h-[85vh] xs:w-[90vw] sm:w-[60vw] rounded-md mx-auto animate-display overflow-x-hidden relative"
        sx={{ bgcolor: "primary.main", color: "secondary.main" }}
      >
        <Box className="flex flex-col rounded-xl xs:p-[2vw] sm:p-3 font-sans animate-display overflow-hidden">
          <Box className="flex w-[100%] justify-between">
            <Box className="flex max-w-[60%] items-center sm:w-auto">
              <h3 className="text-[#1890FF] text-xl inline-block s:whitespace-nowrap text-clamp-xl max-h-[100%] max-w-[100%] text-ellipsis overflow-hidden">
                {data.article.title.length > 20 ? `${formatTitle(data.article.title)}...` : data.article.title}
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
                  {formatDate(data.article.createdAt)}
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
            <p className="text-xs text-clamp">{data.article.description}</p>
          </Box>
          {data.article.author.username === userData?.user.username && (
            <Box sx={{ display: "flex", gap: "8px", justifyContent: "end" }}>
              <CustomConfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Btn danger style={{ backgroundColor: `${theme.palette.primary.main}` }}>
                  Delete
                </Btn>
              </CustomConfirm>
              <Btn
                style={{ backgroundColor: `${theme.palette.primary.main}` }}
                className="!text-green-500 border-green-500 hover:!border-green-300 hover:!text-green-400"
              >
                Edit
              </Btn>
            </Box>
          )}
        </Box>
        <section className="p-[2vw] sm:p-3 break-words text-clamp">
          <Markdown>{data.article.body}</Markdown>
        </section>
      </Box>
    )
  )
}
