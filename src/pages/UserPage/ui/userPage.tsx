import { Box, Button, CircularProgress, Theme } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEditProfileMutation,
  useFollowUserMutation,
  useGetArticlesQuery,
  useGetCurrentUserQuery,
  useGetProfileQuery,
  useUnfollowUserMutation,
} from "shared/redux/api"
import { Portal } from "shared/ui/Portal/portal"
import { store } from "shared/redux"
import clsx from "clsx"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import ArticleIcon from "@mui/icons-material/Article"
import { setUser } from "shared/redux/local"
import { useTheme } from "@emotion/react"
import { FormField } from "shared/ui/form-field/form-field"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../utils/schema"
import EditIcon from "@mui/icons-material/Edit"
import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import { FaUserEdit } from "react-icons/fa"

const avatar = require("../../../shared/assets/avatar.png")

export const UserPage: React.FC = (): JSX.Element => {
  const { username } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, refetch } = useGetProfileQuery(username)
  const { data: articles } = useGetArticlesQuery({ username: username })
  const { data: user } = useGetCurrentUserQuery(null)
  const [edit] = useEditProfileMutation()
  const [follow] = useFollowUserMutation()
  const [unfollow] = useUnfollowUserMutation()
  const [showImg, setshowImg] = useState<boolean>(false)
  const [openBio, setOpenBio] = useState<boolean>(false)
  const [image, setImage] = useState<string | undefined>()
  const token = localStorage.getItem("token")
  const { changed } = useSelector((state: ReturnType<typeof store.getState>) => state.local)
  const theme = useTheme() as Theme
  const {
    handleSubmit,
    register,
    reset,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const handleClick = () => setshowImg(false)
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const { bio } = data
    if (user) {
      const { username, email } = user.user
      const { error } = await edit({ user: { username, email, bio } })
      if (!error) {
        clearErrors()
        reset()
        refetch()
        setOpenBio(false)
      }
    }
  })
  useEffect(() => {
    if (data) console.log(data)
  }, [data])

  useEffect(() => {
    if (showImg) document.getElementById("root")?.classList.add("brightness")
    else document.getElementById("root")?.classList.remove("brightness")
  }, [showImg])

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    if (data) {
      if (changed.includes(data.profile.username)) {
        setImage(avatar)
      } else {
        setImage(data.profile.image)
      }
    }
  }, [data])

  return !data ? (
    <CircularProgress className="m-auto" />
  ) : (
    <>
      <Box
        className="h-[500px] rounded-[1.375rem] w-[60vw] m-auto animate-display"
        sx={{
          bgcolor: "primary.main",
          position: "relative",
          boxShadow: `0px 0px 4px ${theme.palette.mode === "dark" ? "#494949" : "#d6caca"}`,
        }}
      >
        {data && (
          <>
            <img
              src={image}
              onClick={(e) => {
                e.stopPropagation()
                if (image !== avatar) setshowImg(true)
              }}
              onKeyDown={() => {
                return
              }}
              alt="avatar"
              className={clsx(
                "bg-white xs:w-[100px] xs:h-[100px] sm:w-[175px] sm:h-[175px] top-5 absolute left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-[50%]  border-solid border-[2px] border-[#0288d1]",
                image !== avatar && "hover:opacity-70 cursor-pointer transition-opacity duration-200"
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
                color: "text.primary",
                textTransform: "capitalize",
                textAlign: "center",
              }}
              className="text-clamp"
            >
              {data.profile.bio}
            </Box>
            <Box className="mt-[10px] flex flex-col gap-4 items-center">
              {user?.user.username === data.profile.username && (
                <Button
                  startIcon={<EditIcon sx={{ fontSize: "16px" }} />}
                  variant="text"
                  color="success"
                  onClick={() => setOpenBio(true)}
                >
                  Edit bio
                </Button>
              )}
              {token && user?.user.username !== data.profile.username && (
                <Box className="flex flex-col items-center gap-3" sx={{ fontSize: "12px", color: "text.primary" }}>
                  {(!data.profile.following && <Box>Not Follow {<CloseIcon sx={{ fontSize: "12px" }} />}</Box>) || (
                    <Box>You are following {<DoneIcon sx={{ fontSize: "12px" }} />}</Box>
                  )}
                  {(!data.profile.following && (
                    <Button
                      onClick={() => follow(data.profile.username)}
                      sx={{ maxWidth: "150px" }}
                      color="success"
                      variant="outlined"
                      endIcon={<PersonAddAlt1Icon />}
                    >
                      Follow
                    </Button>
                  )) || (
                    <Button
                      onClick={() => unfollow(data.profile.username)}
                      sx={{ maxWidth: "150px" }}
                      color="error"
                      variant="outlined"
                      endIcon={<PersonRemoveIcon />}
                    >
                      Unfollow
                    </Button>
                  )}
                </Box>
              )}
              {user?.user.username === data.profile.username && (
                <>
                  <form onSubmit={onSubmit} className="flex flex-col items-center gap-5">
                    {openBio && (
                      <>
                        <FormField
                          name="bio"
                          id="bio"
                          placeholder="Bio"
                          type="bio"
                          rows={1}
                          defaultValue={data.profile.bio}
                          multiline={true}
                          register={register}
                          error={!!errors.bio}
                          errors={errors.bio}
                        />
                      </>
                    )}
                    {openBio && (
                      <Box className="flex gap-2">
                        <Button
                          type="submit"
                          color="info"
                          variant="text"
                          onClick={(e) => {
                            if (!openBio) {
                              e.preventDefault()
                            }
                            setOpenBio(true)
                          }}
                        >
                          Submit
                        </Button>

                        <Button
                          onClick={() => {
                            setOpenBio(false)
                            reset()
                            clearErrors()
                          }}
                          color="error"
                          variant="text"
                          className="animate-display"
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </form>
                  {!data.profile.bio && (
                    <Button
                      color={openBio ? "error" : "info"}
                      variant="text"
                      onClick={() => {
                        if (openBio) {
                          clearErrors()
                          reset()
                        }
                        setOpenBio((prev) => !prev)
                      }}
                    >
                      Add Bio
                    </Button>
                  )}
                  <Button
                    color="info"
                    variant="outlined"
                    onClick={() => navigate("/edit-profile")}
                    sx={{ textTransform: "capitalize" }}
                    endIcon={<FaUserEdit />}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
              {articles?.articlesCount && (
                <Button
                  onClick={() => {
                    dispatch(setUser(data.profile.username))
                    navigate(`/articles/author/${username}`)
                  }}
                  endIcon={<ArticleIcon />}
                  sx={{ textTransform: "capitalize" }}
                  color="info"
                  variant="outlined"
                >
                  {articles.articlesCount} {articles.articlesCount > 1 ? "articles" : "article"}
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
      {data && (
        <Portal isOpen={showImg}>
          <div className="absolute w-[100vw] h-[100vh]">
            <img
              src={image}
              alt="avatar"
              className="absolute xs:w-[70vw] s:w-[50vw] max-w-[700px] max-h-[700px] animate-display left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded"
            ></img>
          </div>
        </Portal>
      )}
    </>
  )
}
