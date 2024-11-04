import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGetCurrentUserQuery } from "shared/redux/api"
import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { baseApi } from "shared/redux/api"
import Box from "@mui/material/Box"
import { ThemeProvider, createTheme, useColorScheme } from "@mui/material/styles"
import { ToggleTheme } from "shared/ui/toggleTheme/ui/toggleTheme"
const avatar = require("../assets/avatar.png")
export const AppHeader: React.FC = () => {
  const { data } = useGetCurrentUserQuery("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogOut = () => {
    dispatch(baseApi.util.resetApiState())
    localStorage.removeItem("token")
    navigate("/")
  }

  const { mode = "light", setMode } = useColorScheme()
  // if (!mode) {
  //   return null
  // }
  return (
    <Box
      className="flex p-2 h-[80px] items-center justify-between"
      sx={{ bgcolor: "primary.main", color: "secondary.main" }}
    >
      <Box className="w-[150px]">
        <Link to={"/articles"} onClick={() => dispatch(baseApi.util.invalidateTags(["Article"]))}>
          <span>RealWorld Blog</span>
        </Link>
      </Box>
      {!data && (
        <Box className="flex gap-4 animate-display">
          <Link to={"/sign-in"} className="flex items-center justify-center font-sans text-black">
            Sign In
          </Link>
          <Link
            to={"/sign-up"}
            className="flex items-center justify-center  hover:opacity-80 w-[109px] h-[51px] border-solid border-[1px] border-lime-600 rounded text-lime-600 "
          >
            Sign Up
          </Link>
        </Box>
      )}
      {data && (
        <div className="flex gap-5 items-center animate-display">
          <Link to={"/create-article"}>
            <Button variant="contained">Create article</Button>
          </Link>
          <div className="flex items-center gap-2">
            <span>{data.user.username}</span>
            <img src={data.user.image || avatar} alt="avatar" className="w-12" />
          </div>
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      )}
      <ToggleTheme setMode={setMode} mode={mode} />
    </Box>
  )
}
