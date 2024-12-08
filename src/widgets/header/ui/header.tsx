import React, { memo, useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { baseApi, useGetCurrentUserQuery } from "shared/redux/api"
import { Button, useMediaQuery, Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { Theme, useColorScheme } from "@mui/material/styles"
import clsx from "clsx"
import { MaterialUISwitch } from "shared/ui/toggleTheme/ui/Toggle"
import { useTheme } from "@emotion/react"
import LogoutIcon from "@mui/icons-material/Logout"
import AddIcon from "@mui/icons-material/Add"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import LoginIcon from "@mui/icons-material/Login"
import { IoPlanetSharp } from "react-icons/io5"
import { setUser } from "shared/redux/local"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
const avatar = require("../assets/avatar.png")
export const AppHeader: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const theme = useTheme() as Theme
  const isMobile = useMediaQuery("(max-width: 480px)")
  const isMobileX = useMediaQuery("(max-width: 360px)")
  const { mode, setMode } = useColorScheme()
  const isPointer = useMediaQuery("(pointer: fine)")
  const token = localStorage.getItem("token")
  const { data } = useGetCurrentUserQuery(null)
  const handleLogOut = useCallback(() => {
    dispatch(baseApi.util.resetApiState())
    localStorage.removeItem("token")
    navigate("/")
  }, [])
  console.log("header")
  return (
    <Box className="h-[75px]">
      <Box
        id="header"
        className="flex p-2 h-[75px] items-center justify-between fixed w-[100%]"
        sx={{
          bgcolor: "primary.main",
          color: "secondary.main",
          boxShadow: `0 -2px 5px ${theme.palette.text.primary}`,
          zIndex: 1,
        }}
      >
        <Box className={clsx("flex flex-wrap items-center justify-center")}>
          <Link
            to={"/articles"}
            onClick={() => {
              dispatch(baseApi.util.invalidateTags(["Article"]))
              dispatch(setUser(""))
            }}
          >
            {!isMobile && (
              <span className="flex text-[18px] text-clip whitespace-nowrap align-middle text-[#0288d1] hover:opacity-70 transition-opacity duration-200">
                RealW{<IoPlanetSharp className="self-center" />}rld Blog
              </span>
            )}
            {isMobile && (
              <button className="flex items-center justify-center">
                <IoPlanetSharp className="text-[46px] text-[#0288d1]" id="planet" />
              </button>
            )}
          </Link>
          <MaterialUISwitch onClick={() => setMode(mode === "dark" ? "light" : "dark")} checked={mode === "dark"} />
        </Box>
        {!data && !token && (
          <Box className="flex gap-4 animate-display">
            <Button
              color="info"
              onClick={() => navigate("/sign-in")}
              endIcon={<LoginIcon />}
              sx={{ fontSize: isMobileX ? "12px" : "16px", whiteSpace: "nowrap" }}
            >
              Sign In
            </Button>
            <Button
              color="success"
              onClick={() => navigate("/sign-up")}
              endIcon={<PersonAddAltIcon />}
              variant="outlined"
              sx={{ textTransform: "capitalize", fontSize: isMobileX ? "12px" : "16px", whiteSpace: "nowrap" }}
            >
              Sign Up
            </Button>
          </Box>
        )}
        {data && (
          <Box className="flex items-center animate-display gap-[2vw]">
            {pathname !== "/create-article" && !isMobileX && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => navigate("/create-article")}
                color="success"
                className="whitespace-nowrap animate-display"
                sx={{
                  textTransform: "capitalize",
                  fontSize: isMobile ? "12px" : "clamp(12px, 1vw, 1rem)",
                  padding: isMobile ? "3.7px" : "auto",
                }}
              >
                Create article
              </Button>
            )}
            {pathname !== "/create-article" && isMobileX && (
              <Button
                variant="text"
                startIcon={<NoteAddIcon />}
                onClick={() => navigate("/create-article")}
                color="success"
                className="whitespace-nowrap animate-display"
                sx={{
                  minWidth: 0,
                  "& .MuiButton-startIcon": {
                    margin: 0,
                  },
                }}
              />
            )}
            <div className="flex items-center gap-2">
              {!isMobile && <span className="capitalize">{data.user.username}</span>}
              <Link to={`/profile/${data.user.username}`}>
                <img
                  src={data.user.image || avatar}
                  alt="avatar"
                  className={clsx(
                    "xs:w-12 xs:h-12 lg:w-14 lg:h-14 border-[2px] border-solid border-[#1890FF] rounded-[50%]",
                    isPointer ? "hover:opacity-50 transition-opacity duration-200 ease-in-out" : null
                  )}
                />
              </Link>
            </div>
            <Button
              variant="outlined"
              onClick={handleLogOut}
              color="info"
              className="whitespace-nowrap"
              startIcon={<LogoutIcon />}
              sx={{
                textTransform: "capitalize",
                fontSize: isMobile ? "12px" : "clamp(12px, 1vw, 1rem)",
                padding: isMobile ? "3.7px" : "auto",
                "& .MuiButton-startIcon": {
                  marginLeft: 0,
                },
              }}
            >
              Log Out
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
