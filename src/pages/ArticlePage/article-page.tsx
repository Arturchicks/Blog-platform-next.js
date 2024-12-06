import Markdown from "react-markdown"
import React, { createRef, LegacyRef, Ref, useEffect, useRef, useState } from "react"
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
import { change, setUser } from "shared/redux/local"
import { useTheme } from "@emotion/react"
import CreateIcon from "@mui/icons-material/Create"
import DeleteIcon from "@mui/icons-material/Delete"
import ArticleIcon from "@mui/icons-material/Article"
import ImageIcon from "@mui/icons-material/Image"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Portal } from "shared/ui/Portal/portal"

const avatar = require("../../shared/assets/avatar.png")

export const ArticlePage: React.FC = () => {
  const { slug } = useParams()
  const { data } = useGetArticleQuery(`${slug}`)
  const { data: comments } = useGetCommentsQuery(`${slug}`)
  const [open, setOpen] = useState<boolean>(false)
  const { data: userData } = useGetCurrentUserQuery(null)
  const [load, setLoad] = useState<boolean>(false)
  const [image, setImage] = useState<string | undefined>()
  const [commentsQuantity, setCommentsQuantuity] = useState<number>(5)
  const { changed } = useSelector((state: ReturnType<typeof store.getState>) => state.local)
  const [setLike] = useSetLikeMutation()
  const [del] = useDeleteArticleMutation()
  const navigate = useNavigate()
  const [showImg, setshowImg] = useState<boolean>(false)
  const ref = useRef(null)
  const portalRef = useRef(null)
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
    setOpen(false)
    setshowImg(false)
  }
  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
  useEffect(() => {
    if (showImg) document.getElementById("root")?.classList.add("brightness")
    else document.getElementById("root")?.classList.remove("brightness")
  }, [showImg])

  return !data ? (
    <CircularProgress className="m-auto" />
  ) : (
    <>
      <Box
        className="min-h-[550px] xs:w-[90vw] sm:w-[60vw] rounded-md mx-auto animate-display overflow-x-hidden p-3 flex flex-col gap-[20px]"
        sx={{
          bgcolor: "primary.main",
          color: "secondary.main",
          boxShadow: `0px 0px 3px ${theme.palette.mode === "dark" ? "#494949" : "#d6caca"}`,
        }}
      >
        <section>
          <div>
            <Box className="flex flex-col rounded-xl  font-sans animate-display p-1">
              <Box className="flex w-[100%] justify-between">
                <Box className="flex max-w-[60%] items-center sm:w-auto">
                  <h3 className="text-[#1890FF] text-xl inline-block s:whitespace-nowrap text-clamp-xl max-h-[100%] max-w-[100%] text-ellipsis overflow-hidden capitalize">
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
                      setOpen((prev) => !prev)
                    }}
                  >
                    {!load && <CircularProgress color="info" />}
                    <img
                      src={image || data.article.author.image}
                      onLoad={() => setLoad(true)}
                      alt="avatar"
                      style={{ display: load ? "block" : "none" }}
                      className="rounded-[50%] animate-display min-w-[56px] w-[56px] min-h-[56px] h-[56px] gradient-box hover:opacity-50 transition-opacity duration-200"
                    />
                  </Button>
                  <CSSTransition nodeRef={ref} in={open} timeout={300} classNames="alert" unmountOnExit>
                    <Box
                      ref={ref}
                      className="w-28 animate-display absolute bottom-[-95px] rounded right-3 z-[1]"
                      sx={{ backgroundColor: "#b4b6ba" }}
                    >
                      <Button
                        className="whitespace-nowrap w-full hover:bg-slate-400"
                        sx={{ fontSize: "10px", color: "white", textTransform: "capitalize" }}
                        endIcon={<AccountBoxIcon />}
                        onClick={() => navigate(`/profile/${data.article.author.username}`)}
                      >
                        Show Profile
                      </Button>
                      <Button
                        endIcon={<ImageIcon />}
                        className="whitespace-nowrap w-full hover:bg-slate-400"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpen(false)
                          setshowImg(true)
                        }}
                        sx={{ fontSize: "10px", color: "white", textTransform: "capitalize" }}
                      >
                        Show image
                      </Button>
                      <Button
                        endIcon={<ArticleIcon />}
                        onClick={() => {
                          dispatch(setUser(data.article.author.username))
                          navigate(`/articles/author/${data.article.author.username}`)
                        }}
                        sx={{ fontSize: "10px", color: "white", textTransform: "capitalize" }}
                        className="inline-block whitespace-nowrap w-full hover:bg-slate-400"
                      >
                        Show articles
                      </Button>
                    </Box>
                  </CSSTransition>
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
              <TransitionGroup>
                {comments?.comments
                  .map((e: CommentType) => {
                    const ref = createRef()
                    return (
                      <CSSTransition
                        nodeRef={ref as Ref<HTMLElement | undefined> | undefined}
                        in={!!e.id}
                        timeout={300}
                        key={e.id}
                        classNames="alert"
                        unmountOnExit
                      >
                        <Comment
                          {...e}
                          ref={ref as LegacyRef<HTMLDivElement> | undefined}
                          username={userData?.user.username}
                          key={e.id}
                        />
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
      <Portal isOpen={showImg}>
        <div className="absolute w-[100vw] h-[100vh]">
          <CSSTransition in={showImg} nodeRef={portalRef} timeout={300} classNames="alert" unmountOnExit>
            <img
              src={data.article.author.image}
              alt="avatar"
              ref={portalRef}
              className="absolute max-w-[500px] xs:w-[70vw] s:w-[50vw] sm:w-[30vw] animate-display left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded"
            ></img>
          </CSSTransition>
        </div>
      </Portal>
    </>
  )
}
