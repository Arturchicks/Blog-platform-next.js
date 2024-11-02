import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGetCurrentUserQuery } from "shared/redux/api"
import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { baseApi } from "shared/redux/api"
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

  ;("Render header")
  return (
    <div className="flex h-[80px] items-center justify-between bg-white p-4">
      <div className="w-[150px] text-black">
        <Link to={"/articles"} onClick={() => dispatch(baseApi.util.invalidateTags(["Article"]))}>
          <span>RealWorld Blog</span>
        </Link>
      </div>
      {!data && (
        <div className="flex gap-4 animate-display">
          <Link to={"/sign-in"} className="flex items-center justify-center font-sans text-black">
            Sign In
          </Link>
          <Link
            to={"/sign-up"}
            className="flex items-center justify-center  hover:opacity-80 w-[109px] h-[51px] border-solid border-[1px] border-lime-600 rounded text-lime-600 "
          >
            Sign Up
          </Link>
        </div>
      )}
      {data && (
        <div className="flex gap-5 items-center animate-display">
          <Link
            to={"/create-article"}
            className="p-[0.3em] text-[#52C41A] border border-[#52C41A] rounded flex items-center justify-center hover:opacity-50"
          >
            Create article
          </Link>
          <div className="flex items-center gap-2">
            <span>{data.user.username}</span>
            <img src={data.user.image || avatar} alt="avatar" className="w-12" />
          </div>
          <Button variant="outlined" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      )}
    </div>
  )
}
