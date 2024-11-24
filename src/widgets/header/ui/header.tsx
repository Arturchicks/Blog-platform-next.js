import React, { useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { baseApi, useGetCurrentUserQuery } from "shared/redux/api"
import { Button, useMediaQuery, Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { Theme, useColorScheme } from "@mui/material/styles"
import clsx from "clsx"
import { MaterialUISwitch } from "shared/ui/toggleTheme/ui/Toggle"
import { useTheme } from "@emotion/react"

export const AppHeader: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const theme = useTheme() as Theme
  const isMobile = useMediaQuery("(max-width: 480px)")
  const { mode, setMode } = useColorScheme()
  const isPointer = useMediaQuery("(pointer: fine)")
  const token = localStorage.getItem("token")
  const { data } = useGetCurrentUserQuery(null)
  const handleLogOut = useCallback(() => {
    dispatch(baseApi.util.resetApiState())
    localStorage.removeItem("token")
    navigate("/")
  }, [])

  return (
    <Box className="h-[80px]">
      <Box
        id="header"
        className="flex p-2 h-[80px] items-center justify-between fixed w-[100%]"
        sx={{
          bgcolor: "primary.main",
          color: "secondary.main",
          boxShadow: `.5px .2px 0px ${theme.palette.text.primary}`,
          zIndex: 1,
        }}
      >
        <Box className={clsx("flex flex-wrap items-center justify-center")}>
          <Link to={"/articles"} onClick={() => dispatch(baseApi.util.invalidateTags(["Article"]))}>
            <span className="xs:text-[10px] s:text-[12px] sm:text-[16px] text-clip whitespace-nowrap">
              RealWorld Blog
            </span>
          </Link>
          <MaterialUISwitch onClick={() => setMode(mode === "dark" ? "light" : "dark")} checked={mode === "dark"} />
        </Box>
        {!data && !token && (
          <Box className="flex gap-4 animate-display">
            <Button color="info" onClick={() => navigate("/sign-in")}>
              Sign In
            </Button>
            <Button
              color="success"
              onClick={() => navigate("/sign-up")}
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            >
              Sign Up
            </Button>
          </Box>
        )}
        {data && (
          <Box className="flex items-center animate-display gap-[2vw]">
            {pathname !== "/create-article" && (
              <Button
                variant="outlined"
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
            <div className="flex items-center gap-2">
              {!isMobile && <span className="capitalize">{data.user.username}</span>}
              <Link
                to={"/edit-profile"}
                onClick={(e) => {
                  if (pathname === "/edit-profile") {
                    e.preventDefault()
                    return
                  }
                }}
              >
                <img
                  src={data.user.image}
                  alt="avatar"
                  className={clsx(
                    "w-12 h-12",
                    isPointer ? "hover:opacity-50 transition-opacity duration-200 ease-in-out" : null,
                    "rounded-[50%]"
                  )}
                />
              </Link>
            </div>
            <Button
              variant="outlined"
              onClick={handleLogOut}
              color="info"
              className="whitespace-nowrap animate-display"
              sx={{
                textTransform: "capitalize",
                fontSize: isMobile ? "12px" : "clamp(12px, 1vw, 1rem)",
                padding: isMobile ? "3.7px" : "auto",
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
