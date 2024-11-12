import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { baseApi, useGetCurrentUserQuery } from "shared/redux/api"
import { Button, useMediaQuery, Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { useColorScheme } from "@mui/material/styles"
import { ToggleTheme } from "shared/ui/toggleTheme/ui/toggleTheme"
import clsx from "clsx"

export const AppHeader: React.FC = () => {
  const { data } = useGetCurrentUserQuery(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isMobile = useMediaQuery("(max-width: 480px)")
  const isPointer = useMediaQuery("(pointer: fine)")
  const { mode, setMode } = useColorScheme()
  const handleLogOut = () => {
    dispatch(baseApi.util.resetApiState())
    localStorage.removeItem("token")
    navigate("/")
  }
  console.log("pdated")
  return (
    <Box
      className="flex p-2 h-[80px] items-center justify-between"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <Box className="relative">
        <Link to={"/articles"}>
          <span className="xs:text-[10px] s:text-[12px] sm:text-[16px] text-clip whitespace-nowrap">
            RealWorld Blog
          </span>
        </Link>
        <ToggleTheme setMode={setMode} mode={mode} />
      </Box>
      {!data && (
        <Box className="flex gap-4 animate-display">
          <Button onClick={() => navigate("/sign-in")} color="info">
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/sign-up")}
            color="success"
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
  )
}
