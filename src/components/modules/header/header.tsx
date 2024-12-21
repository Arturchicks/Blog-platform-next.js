"use client"

import React, { useEffect } from "react"
import { Button, useMediaQuery, Box, Fade } from "@mui/material"
import { Theme, useColorScheme } from "@mui/material/styles"
import clsx from "clsx"
import Image from "next/image"
import { useTheme } from "@emotion/react"
import LogoutIcon from "@mui/icons-material/Logout"
import AddIcon from "@mui/icons-material/Add"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import LoginIcon from "@mui/icons-material/Login"
import { IoPlanetSharp as Planet } from "react-icons/io5"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ToggleTheme } from "../../UI/toggle-theme"
import avatar from "@/utils/images/avatar.svg"
import { useDispatch, useSelector } from "react-redux"
import { setLogIn } from "@/store/slice"
import { useGetCurrentUserQuery } from "@/store/api"
import { store } from "@/store/store"
import Logo from "../../UI/logo"
import { handleLogOut } from "@/utils/helpers/handleLogOut"

const AppHeader: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme() as Theme
  const mobile = useMediaQuery("(max-width: 480px)")
  const { mode, setMode } = useColorScheme()
  const isPointer = useMediaQuery("(pointer: fine)")
  const token = localStorage.getItem("token")
  const router = useRouter()
  const { isLoggedIn } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.local
  )
  const { data } = useGetCurrentUserQuery(null, { skip: !isLoggedIn })

  useEffect(() => {
    if (token) dispatch(setLogIn(token))
  }, [data])

  return (
    <Box className="h-[80px]">
      <Box
        id="header"
        className="flex p-2 h-[80px] items-center justify-between fixed w-[100%]"
        sx={{
          bgcolor: "primary.100",
          color: "text.primary",
          boxShadow: `0 -2px 5px ${theme.palette.secondary.main}`,
          zIndex: 1,
          backdropFilter: "saturate(180%) blur(5px)",
        }}
      >
        <Box className={clsx("flex flex-wrap items-center justify-center")}>
          <Link href="/">
            {mobile ? <Planet className="text-5xl text-blue-600" /> : <Logo />}
          </Link>
          <ToggleTheme
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            checked={mode === "dark"}
          />
        </Box>

        {!token && (
          <Fade in={!isLoggedIn}>
            <Box className="flex gap-4">
              <Button
                color="info"
                onClick={() => router.push("/sign-in")}
                endIcon={<LoginIcon />}
              >
                Sign In
              </Button>
              <Button
                color="success"
                onClick={() => router.push("/sign-up")}
                endIcon={<PersonAddAltIcon />}
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
              >
                Sign Up
              </Button>
            </Box>
          </Fade>
        )}
        {token && data && (
          <Fade in={isLoggedIn}>
            <Box className="flex items-center gap-[2vw]">
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => router.push("/create-article")}
                color="success"
                className="whitespace-nowrap animate-display"
                sx={{
                  textTransform: "capitalize",
                  fontSize: mobile ? "12px" : "clamp(12px, 1vw, 1rem)",
                  padding: mobile ? "3.7px" : "auto",
                }}
              >
                Create article
              </Button>
              <div className="flex items-center gap-2 animate-display">
                {!mobile && (
                  <span className="capitalize">{data.user.username}</span>
                )}
                <Link href={`/profile/${data.user.username}`}>
                  <Image
                    src={data.user.image || avatar}
                    alt="avatar"
                    className={clsx(
                      "xs:w-12 xs:h-12 lg:w-14 lg:h-14 rounded-[50%] animate-display",
                      isPointer
                        ? "hover:opacity-50 transition-opacity duration-200 ease-in-out"
                        : null
                    )}
                    width={46}
                    height={46}
                  />
                </Link>
              </div>
              <Button
                variant="outlined"
                color="info"
                className="whitespace-nowrap animate-display"
                startIcon={<LogoutIcon />}
                onClick={() => handleLogOut(router, dispatch)}
                sx={{
                  textTransform: "capitalize",
                  fontSize: mobile ? "12px" : "clamp(12px, 1vw, 1rem)",
                  padding: mobile ? "3.7px" : "auto",
                }}
              >
                Log Out
              </Button>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  )
}
export default AppHeader
