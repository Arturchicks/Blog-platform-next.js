"use client"
import { CSSTransition } from "react-transition-group"
import Favorites from "@/components/modules/favorites/favorites"
import {
  useGetArticleQuery,
  useGetCommentsQuery,
  useGetCurrentUserQuery,
  useSetLikeMutation,
  useDeleteArticleMutation,
} from "@/store/api"
import { doubleTap } from "@/utils/helpers/double-tap/double-tap"
import { CircularProgress, Button } from "@mui/material"
import Box from "@mui/material/Box"
import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import CreateIcon from "@mui/icons-material/Create"
import DeleteIcon from "@mui/icons-material/Delete"
import Markdown from "react-markdown"
import Data from "@/components/modules/data/data"
import { mdImgEncode } from "@/utils/helpers/md-img-encode"
import React from "react"
import CommentsSection from "@/components/modules/comments-section/comments-section"
import TagList from "@/components/modules/tag-list/tag-list"
import PopConfirm from "@/components/UI/pop-confirm"
import { setUsername } from "@/store/slice"
import { useDispatch } from "react-redux"

const ArticlePage: React.FC = () => {
  const { slug }: { slug: string } = useParams()
  const router = useRouter()
  const { data } = useGetArticleQuery(slug)
  const [md, setMd] = useState<string | undefined>()
  const dispatch = useDispatch()
  const { data: commentsData } = useGetCommentsQuery(slug)
  const { data: userData } = useGetCurrentUserQuery(null)
  const [animation, setAnimation] = useState<string>("")
  const popRef = useRef(null)
  const [load, setLoad] = useState<boolean>(false)
  const [popOpen, setPopOpen] = useState<boolean>(false)
  const [image, setImage] = useState<string | undefined>()
  const [commentsQuantity, setCommentsQuantuity] = useState<number>(5)
  const [setLike] = useSetLikeMutation()
  const [del] = useDeleteArticleMutation()
  const [method, setMethod] = useState<string>("DELETE")
  const handleDelete = async () => {
    const { error } = await del(slug)
    if (!error) router.push("/")
  }
  const handleDoubleTap = doubleTap({
    setAnimation,
    setLike,
    setMethod,
    method,
    slug,
  })
  const handlePopClose = () => setPopOpen(false)
  const handleQuantity = () => {
    if (commentsData) {
      const { comments } = commentsData
      if (comments.length > commentsQuantity) {
        setCommentsQuantuity((prev) => prev + comments.length)
      } else {
        setCommentsQuantuity(5)
      }
    }
  }

  useEffect(() => {
    if (data) {
      setMd(mdImgEncode(data.article.body))
      if (data?.article.favorited) {
        setMethod("DELETE")
      } else {
        setMethod("POST")
      }
    }
  }, [data])

  useEffect(() => {
    window.addEventListener("click", handlePopClose)
    return () => window.removeEventListener("click", handlePopClose)
  }, [])

  return !data ? (
    <CircularProgress className="m-auto" />
  ) : (
    <Box
      onClick={handleDoubleTap}
      className="min-h-[550px] xs:w-[90vw] animate-display sm:w-[60vw] rounded-md mx-auto overflow-x-hidden p-3 flex flex-col gap-[20px] mt-5"
      sx={{
        bgcolor: "primary.main",
        boxShadow: "0px 0px 3px",
        color: "primary.200",
      }}
    >
      {data && (
        <section>
          <Box sx={{ color: "text.primary" }}>
            <Box className="flex flex-col rounded-xl font-sans animate-display">
              <Box className="flex w-[100%] justify-between min-h-[56px]">
                <Box className="flex max-w-[60%] items-center sm:w-auto">
                  <h3 className="text-[#1890FF] text-xl inline-block s:whitespace-nowrap text-clamp-xl max-h-[100%] max-w-[100%] text-ellipsis overflow-hidden capitalize">
                    {data?.article.title.trim() || "Untitled"}
                  </h3>
                  <Favorites
                    count={data.article.favoritesCount}
                    liked={data.article.favorited}
                    slug={data.article.slug}
                    onToggleLike={setLike}
                    className={animation}
                  />
                </Box>
                <Box className="flex w-auto xs:gap-1 gap-2 justify-end max-w-[50%] min-w-[40%] relative">
                  <Box className="flex flex-col text-right w-[80%] justify-center overflow-hidden">
                    <Box
                      className="overflow-hidden text-ellipsis"
                      sx={{
                        fontSize: "clamp(14px, 2vw, 16px)",
                        color: "text.primary",
                      }}
                    >
                      {data?.article.author.username}
                    </Box>
                    <Data data={data.article.createdAt} />
                  </Box>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      dispatch(setUsername(data.article.author.username))
                      router.push(`/profile/${data.article.author.username}`)
                    }}
                    sx={{ padding: 0 }}
                  >
                    {!load && <CircularProgress color="info" />}
                    <img
                      src={image || data.article.author.image}
                      onLoad={() => setLoad(true)}
                      alt="avatar"
                      style={{ display: load ? "block" : "none" }}
                      className="rounded-[50%] animate-display ImgSm border-[2px] border-solid border-[#1890FF] hover:opacity-50 transition-opacity duration-200"
                    />
                  </Button>
                </Box>
              </Box>
              <TagList tagList={data.article.tagList} />
              <Box
                className="overflow-hidden"
                sx={{ color: "text.secondary", display: "flex", gap: "1em" }}
              >
                <p className="text-[12px]">{data.article.description}</p>
              </Box>
              {data.article.author.username === userData?.user.username && (
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "end",
                    position: "relative",
                  }}
                >
                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    aria-describedby="delete"
                    sx={{ textTransform: "capitalize" }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setPopOpen(true)
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="success"
                    variant="outlined"
                    startIcon={<CreateIcon />}
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => router.push(`/edit-article/${slug}`)}
                  >
                    Edit
                  </Button>
                  <CSSTransition
                    nodeRef={popRef}
                    in={popOpen}
                    timeout={300}
                    classNames="display"
                    unmountOnExit
                  >
                    <PopConfirm del={handleDelete} ref={popRef} />
                  </CSSTransition>
                </Box>
              )}
            </Box>
            <section className="break-words text-clamp min-h-60">
              <Markdown
                className="markdown"
                components={{
                  img: ({ alt, src }) => {
                    return <img src={decodeURIComponent(src)} alt={alt} />
                  },
                }}
              >
                {md}
              </Markdown>
            </section>
          </Box>
        </section>
      )}
      {commentsData && (
        <CommentsSection
          comments={commentsData.comments}
          username={userData?.user.username}
          commentsQuantity={commentsQuantity}
          handleQuantity={handleQuantity}
        />
      )}
    </Box>
  )
}
export default ArticlePage
