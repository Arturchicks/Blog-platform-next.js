import Markdown from "react-markdown"
import React, { useState } from "react"
import { formatDate } from "entities/article/lib/formatDate"
import { formatTitle } from "entities/article/lib/formatTitle"
import Favorites from "entities/article/ui/article/ui/favorites"
import { Tags } from "entities/article/ui/article/ui/tagList"
import type { PopconfirmProps } from "antd"
import { CustomConfirm } from "./ui/popconfirm"
import { Button as Btn, message, Popconfirm } from "antd"
import {
  useGetArticleQuery,
  useGetCurrentUserQuery,
  useSetLikeMutation,
  useDeleteArticleMutation,
} from "shared/redux/api"
import { CircularProgress, Theme, Box } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useTheme } from "@emotion/react"

export const ArticlePage: React.FC = (): JSX.Element => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(slug)
  const { data: userData } = useGetCurrentUserQuery("")
  const [load, setLoad] = useState<boolean>(false)
  const [setLike, result] = useSetLikeMutation()
  const [del, res] = useDeleteArticleMutation()
  const theme = useTheme() as Theme
  // const [image, setImage] = useState(data.author.image)
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
  return (
    data && (
      <Box
        className="max-h-[85vh] w-[70vw] rounded-md mx-auto animate-display overflow-x-hidden relative"
        sx={{ bgcolor: "primary.main", color: "secondary.main" }}
      >
        <Box className="flex flex-col w-[70vw] gap-2 rounded-xl p-[10px] pr-[20px] pl-[20px] font-sans animate-display overflow-hidden">
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
          <Box
            className="mt-[20px] overflow-hidden"
            sx={{ color: "text.primary", display: "flex", gap: "1em", justifyContent: "space-between" }}
          >
            <p className="h-[35px] text-xs">{data.article.description}</p>
            {data.article.author.username === userData?.user.username && (
              <Box sx={{ display: "flex", gap: "8px", position: "absolute", right: "20px" }}>
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
                <Btn style={{ backgroundColor: `${theme.palette.primary.main}` }}>Edit</Btn>
              </Box>
            )}
          </Box>
        </Box>
        <section className="p-5">
          <Markdown>{data.article.body}</Markdown>
        </section>
      </Box>
    )
  )
}
