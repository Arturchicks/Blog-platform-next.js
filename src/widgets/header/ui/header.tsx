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
          <Button onClick={() => navigate("/sign-in")} color="info">
            Sign In
          </Button>
          <Button onClick={() => navigate("/sign-up")} color="success" variant="outlined">
            Sign Up
          </Button>
        </Box>
      )}
      {data && (
        <div className="flex gap-5 items-center animate-display">
          <Button variant="outlined" onClick={() => navigate("/create-article")} color="success">
            Create article
          </Button>

          <div className="flex items-center gap-2">
            <span>{data.user.username}</span>
            <img src={data.user.image || avatar} alt="avatar" className="w-12" />
          </div>
          <Button variant="outlined" onClick={handleLogOut} color="info">
            Log Out
          </Button>
        </div>
      )}
      <ToggleTheme setMode={setMode} mode={mode} />
    </Box>
  )
}
