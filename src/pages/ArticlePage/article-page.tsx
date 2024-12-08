import Markdown from "react-markdown"
import React, { createRef, Ref, useEffect, useState } from "react"
import Favorites from "entities/article/ui/article/ui/favorites"
import { Tags } from "entities/article/ui/article/ui/tagList"
import {
  useGetArticleQuery,
  useGetCurrentUserQuery,
  useSetLikeMutation,
  useDeleteArticleMutation,
  useGetCommentsQuery,
} from "shared/redux/api"
import { CircularProgress, Box, Button, Theme } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { store } from "shared/redux"
import { format } from "date-fns"
import Comments from "./ui/comments"
import Comment from "./ui/comment"
import { CommentType } from "shared/redux/types"
import { change } from "shared/redux/local"
import { useTheme } from "@emotion/react"
import CreateIcon from "@mui/icons-material/Create"
import DeleteIcon from "@mui/icons-material/Delete"
import { CSSTransition, TransitionGroup } from "react-transition-group"

const avatar = require("../../shared/assets/avatar.png")

export const ArticlePage: React.FC = () => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(`${slug}`)
  const { data: comments } = useGetCommentsQuery(`${slug}`)
  const { data: userData } = useGetCurrentUserQuery(null)
  const [test, setTest] = useState<string>("")
  const [load, setLoad] = useState<boolean>(false)
  const [image, setImage] = useState<string | undefined>()
  const [commentsQuantity, setCommentsQuantuity] = useState<number>(5)
  const { changed } = useSelector((state: ReturnType<typeof store.getState>) => state.local)
  const [setLike] = useSetLikeMutation()
  const [del] = useDeleteArticleMutation()
  const navigate = useNavigate()
  const [method, setMethod] = useState<string>("DELETE")
  const theme = useTheme() as Theme
  const handleDelete = async () => {
    const { error } = await del(slug)
    if (!error) navigate("/articles")
  }
  const dispatch = useDispatch()
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (slug) {
      if (changed.includes(slug)) {
        setLoad(true)
        setImage(avatar)
      } else {
        if (!load) {
          timer = setTimeout(() => {
            setImage(avatar)
            dispatch(change(slug))
          }, 2000)
        }
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [load, data])
  const handleClick = () => {
    let tapCount = 0
    let timer: NodeJS.Timeout | undefined
    return () => {
      tapCount++
      clearTimeout(timer)
      timer = setTimeout(() => {
        tapCount = 0
        setTest("")
      }, 400)
      if (tapCount === 2) {
        if (slug) setLike({ slug, method: "POST" })
        setTest("animate-ping")
        setMethod((prev) => (prev === "POST" ? "DELETE" : "POST"))
      }
    }
  }
  const handleClickTest = handleClick()
  useEffect(() => {
    if (data?.article.favorited) {
      setMethod("DELETE")
    } else {
      setMethod("POST")
    }
  }, [data])
  return !data ? (
    <CircularProgress className="m-auto" />
  ) : (
    <Box
      onClick={handleClickTest}
      className="min-h-[550px] xs:w-[90vw] sm:w-[60vw] rounded-md mx-auto animate-display overflow-x-hidden p-3 flex flex-col gap-[20px]"
      sx={{
        bgcolor: "primary.main",
        color: "secondary.main",
        boxShadow: `0px 0px 3px ${theme.palette.mode === "dark" ? "#494949" : "#d6caca"}`,
      }}
    >
      <section>
        <div>
          <Box className="flex flex-col rounded-xl font-sans animate-display p-1">
            <Box className="flex w-[100%] justify-between min-h-[56px]">
              <Box className="flex max-w-[60%] items-center sm:w-auto">
                <h3 className="text-[#1890FF] text-xl inline-block s:whitespace-nowrap text-clamp-xl max-h-[100%] max-w-[100%] text-ellipsis overflow-hidden capitalize">
                  {data.article.title.trim() || "Untitled"}
                </h3>
                <Favorites
                  method={method}
                  count={data.article.favoritesCount}
                  liked={data.article.favorited}
                  slug={data.article.slug}
                  onToggleLike={setLike}
                  className={test}
                />
              </Box>
              <Box className="flex w-auto xs:gap-1 gap-2 justify-end max-w-[50%] min-w-[40%] relative">
                <Box className="flex flex-col text-right w-[80%] justify-center overflow-hidden">
                  <Box className="overflow-hidden text-ellipsis" sx={{ fontSize: "clamp(14px, 2vw, 16px)" }}>
                    {data.article.author.username}
                  </Box>
                  <Box sx={{ color: "text.primary", fontSize: "clamp(12px, 1vw, 12px)" }}>
                    {format(data.article.createdAt, "PP")}
                  </Box>
                </Box>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/profile/${data.article.author.username}`)
                  }}
                  sx={{ padding: 0 }}
                >
                  {!load && <CircularProgress color="info" />}
                  <img
                    src={image || data.article.author.image}
                    onLoad={() => setLoad(true)}
                    alt="avatar"
                    style={{ display: load ? "block" : "none" }}
                    className="rounded-[50%] animate-display min-w-[56px] w-[56px] min-h-[56px] h-[56px] border-[2px] border-solid border-[#1890FF] hover:opacity-50 transition-opacity duration-200"
                  />
                </Button>
              </Box>
            </Box>
            {(data.article?.tagList?.length && <Tags tagList={data.article.tagList} />) || null}
            <Box className="overflow-hidden" sx={{ color: "text.primary", display: "flex", gap: "1em" }}>
              <p className="text-[12px]">{data.article.description}</p>
            </Box>
            {data.article.author.username === userData?.user.username && (
              <Box sx={{ display: "flex", gap: "8px", justifyContent: "end", position: "relative" }}>
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  aria-describedby="delete"
                  sx={{ textTransform: "capitalize" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  color="success"
                  variant="outlined"
                  startIcon={<CreateIcon />}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => navigate(`/edit-article/${slug}`)}
                >
                  Edit
                </Button>
              </Box>
            )}
          </Box>
          <section className="break-words text-clamp min-h-60">
            <Markdown className="markdown">{data.article.body}</Markdown>
          </section>
        </div>
      </section>
      <section className="min-h-40">
        <Box className="text-[20px] font-extralight flex flex-col items-start">
          <div className="flex gap-2 items-center">
            Comments
            <span className="inline-block min-w-6 h-5 rounded-xl bg-[#1890ff] text-[12px] text-center p-[2px] text-white">
              {comments?.comments.length}
            </span>
          </div>
          <div className="w-full flex flex-col gap-3">
            <TransitionGroup className="flex flex-col gap-3">
              {comments?.comments
                .map((e: CommentType) => {
                  const ref = createRef() as Ref<any>
                  return (
                    <CSSTransition nodeRef={ref} in={!!e.id} timeout={300} key={e.id} classNames="alert" unmountOnExit>
                      <Comment {...e} ref={ref} username={userData?.user.username} key={e.id} />
                    </CSSTransition>
                  )
                })
                .reverse()
                .slice(0, commentsQuantity)}
            </TransitionGroup>
          </div>
          {comments?.comments.length > 5 && (
            <Button
              variant="text"
              color="info"
              sx={{ width: "100%" }}
              onClick={() => {
                if (comments?.comments.length > commentsQuantity) {
                  setCommentsQuantuity((prev) => prev + comments?.comments.length)
                } else {
                  setCommentsQuantuity(5)
                }
              }}
            >
              {comments?.comments.length > commentsQuantity ? "Показать все" : "Скрыть"}
            </Button>
          )}
        </Box>
        <Comments data={!!userData} />
      </section>
    </Box>
  )
}
