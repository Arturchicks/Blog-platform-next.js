"use client"
import { Box, Button, CircularProgress, Theme } from "@mui/material"
import React, { JSX, useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatDistanceToNow } from "date-fns"

import clsx from "clsx"
import ArticleIcon from "@mui/icons-material/Article"
import { useTheme } from "@emotion/react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import EditIcon from "@mui/icons-material/Edit"
import { FaUserEdit } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import { schema } from "@/app/edit-profile/utils/schema"
import FormField from "@/components/modules/form-field/form-field"
import {
  useGetProfileQuery,
  useGetCurrentUserQuery,
  useEditProfileMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/store/api"
import { store } from "@/store/store"
import { useFetch } from "@/utils/hooks/useFetch/useFetch"
import { ArticleType } from "@/components/modules/article/types"
import { useParams, useRouter } from "next/navigation"
import { BASE_URL } from "@/utils/base_url"
import { QueryArticles } from "@/store/types"
import { setUsername } from "@/store/slice"
import Portal from "@/components/modules/portal/portal"
import { SwitchComponent } from "@/components/UI/follow-unfollow/follow-unfollow"

const UserPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const { author }: { author: string } = useParams()
  const { isLoggedIn } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.local
  )
  const { data } = useGetProfileQuery(author)
  const token = localStorage.getItem("token")
  const options = useMemo(() => {
    return !token
      ? { method: "GET" }
      : { method: "GET", headers: { Authorization: `Token ${token}` } }
  }, [isLoggedIn])
  const { data: articles } = useFetch<QueryArticles>(
    `${BASE_URL}/articles?author=${author}`,
    options
  )
  const router = useRouter()
  const { data: user } = useGetCurrentUserQuery(null)
  const [closeBio, setCloseBio] = useState<boolean>(true)
  const [edit] = useEditProfileMutation()
  const [follow] = useFollowUserMutation()
  const [unfollow] = useUnfollowUserMutation()
  const [showImg, setshowImg] = useState<boolean>(false)
  const [openBio, setOpenBio] = useState<boolean>(false)
  const [top, setTop] = useState<ArticleType | null>(null)
  const bioRef = useRef(null)
  const theme = useTheme() as Theme
  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<{ bio: string }>({ defaultValues: { bio: "" } })
  const handleClick = () => setshowImg(false)
  const onSubmit = handleSubmit(async (data) => {
    const { bio } = data
    if (user) {
      const { username, email } = user.user
      const { error } = await edit({ user: { username, email, bio } })
      if (!error) reset()
    }
  })

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    if (showImg) document.getElementById("root")?.classList.add("brightness")
    else document.getElementById("root")?.classList.remove("brightness")
  }, [showImg])

  useEffect(() => {
    if (articles?.articles.length) {
      setTop(
        [...articles.articles].sort(
          (a, b) => b.favoritesCount - a.favoritesCount
        )[0]
      )
    }
  }, [articles])

  return !data ? (
    <CircularProgress className="absolute center" />
  ) : (
    <React.Fragment>
      <Box
        className="sm:h-[480px] p-[20px] rounded-[1.375rem] w-[60vw] animate-display center"
        sx={{
          bgcolor: "primary.main",
          position: "absolute",
          left: "50%",
          top: "60%",
          boxShadow: `0px 0px 4px ${
            theme.palette.mode === "dark" ? "#494949" : "#d6caca"
          }`,
        }}
      >
        {data && (
          <React.Fragment>
            <img
              src={data.profile.image}
              onClick={(e) => {
                e.stopPropagation()
                setshowImg(true)
              }}
              onKeyDown={() => {
                return
              }}
              alt="avatar"
              className={clsx(
                "bg-white xs:w-[100px] xs:h-[100px] sm:w-[175px] sm:h-[175px] top-5 absolute left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-[50%]  border-solid border-[2px] border-[#0288d1]",
                "hover:opacity-70 cursor-pointer transition-opacity duration-200"
              )}
            />
            <Box
              sx={{
                color: "text.primary",
                textTransform: "capitalize",
                textAlign: "center",
                fontWeight: 700,
              }}
              className="xs:mt-[75px] sm:mt-[110px] text-clamp-xl"
            >
              {data.profile.username}
            </Box>
            <Box
              sx={{
                color: "text.secondary",
                textTransform: "capitalize",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              {data.profile.bio}
            </Box>
            {articles?.articles[0] && (
              <Box
                sx={{
                  color: "text.primary",
                  textAlign: "center",
                }}
                className="flex flex-col gap-3 items-center"
              >
                <Box sx={{ color: "text.secondary", fontSize: "12px" }}>
                  {`Last update ${formatDistanceToNow(
                    articles?.articles[0].updatedAt
                  )} ago`}
                </Box>
                {articles.articles.length > 1 && (
                  <Button
                    endIcon={<WorkspacePremiumIcon />}
                    sx={{ textTransform: "capitalize", maxWidth: "150px" }}
                    color="info"
                    onClick={() => `/slug/${top?.slug}`}
                  >
                    show top article
                  </Button>
                )}
              </Box>
            )}
            <Box className="mt-[10px] flex flex-col gap-4 items-center">
              {user?.user.username === data.profile.username &&
                data.profile.bio &&
                !openBio && (
                  <Button
                    startIcon={<EditIcon sx={{ fontSize: "16px" }} />}
                    variant="text"
                    color="success"
                    onClick={() => {
                      setOpenBio(true)
                      setCloseBio(false)
                    }}
                  >
                    Edit bio
                  </Button>
                )}
              {token && user?.user.username !== data.profile.username && (
                <Box
                  className="flex flex-col items-center gap-3"
                  sx={{ fontSize: "12px", color: "text.primary" }}
                >
                  <SwitchComponent
                    follow={follow}
                    unfollow={unfollow}
                    following={data.profile.following}
                    username={data.profile.username}
                  />
                </Box>
              )}
              {user?.user.username === data.profile.username && (
                <React.Fragment>
                  <CSSTransition
                    nodeRef={bioRef}
                    in={!closeBio}
                    timeout={300}
                    classNames="alert"
                    onExited={() => setOpenBio(false)}
                    unmountOnExit
                  >
                    <form
                      onSubmit={onSubmit}
                      ref={bioRef}
                      className="flex flex-col items-center gap-5"
                    >
                      <Box className="flex flex-col items-center gap-3">
                        <FormField
                          id="bio"
                          type="bio"
                          rows={1}
                          defaultValue={data.profile.bio}
                          register={register}
                          errors={errors.bio}
                        />
                        <Box className="flex gap-2">
                          <Button
                            type="submit"
                            color="info"
                            variant="text"
                            onClick={() => setCloseBio(true)}
                          >
                            Submit
                          </Button>
                          <Button
                            onClick={() => {
                              setCloseBio(true)
                              reset()
                              clearErrors()
                            }}
                            color="error"
                            variant="text"
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  </CSSTransition>

                  {!data.profile.bio && !openBio && (
                    <Button
                      color={openBio ? "error" : "info"}
                      variant="text"
                      onClick={() => {
                        if (openBio) {
                          clearErrors()
                          reset()
                        }
                        setOpenBio(true)
                        setCloseBio(false)
                      }}
                    >
                      Add Bio
                    </Button>
                  )}
                  <Button
                    color="info"
                    variant="outlined"
                    onClick={() => router.push("/edit-profile")}
                    sx={{ textTransform: "capitalize" }}
                    endIcon={<FaUserEdit />}
                  >
                    Edit Profile
                  </Button>
                </React.Fragment>
              )}
              {articles?.articlesCount && (
                <Button
                  onClick={() => {
                    dispatch(setUsername(data.profile.username))
                    router.push(`/articles/author/${data.profile.username}`)
                  }}
                  endIcon={<ArticleIcon />}
                  sx={{ textTransform: "capitalize" }}
                  color="info"
                  variant="outlined"
                >
                  {articles.articlesCount}{" "}
                  {articles.articlesCount > 1 ? "articles" : "article"}
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
      {data && (
        <Portal isOpen={showImg}>
          <div className="absolute w-[100vw] h-[100vh] top-0">
            <img
              src={data.profile.image}
              alt="avatar"
              className="absolute xs:w-[70vw] s:w-[50vw] max-w-[700px] max-h-[700px] animate-display left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded"
            />
          </div>
        </Portal>
      )}
    </React.Fragment>
  )
}
export default UserPage
