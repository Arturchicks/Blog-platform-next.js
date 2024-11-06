import React, { ReactEventHandler } from "react"
import { IArticle } from "entities/article/types/types"
import { nanoid } from "nanoid"
import { useDispatch } from "react-redux"
import { baseApi } from "shared/redux/api"
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
export const Tags: React.FC<Pick<IArticle, "tagList">> = ({ tagList }) => {
  const dispatch = useDispatch()
  const handleClick: ReactEventHandler = () => {
    dispatch(baseApi.util.invalidateTags(["Article"]))
  }
  return (
    <Box className="flex gap-1">
      {tagList &&
        tagList
          .slice(0, 3)
          .filter((e) => e.length)
          .map((e) => (
            <Box sx={{ color: "text.primary", borderColor: "secondary.main" }} key={nanoid()}>
              <Link
                to={`/articles/tag/${e}`}
                onClick={handleClick}
                className="border rounded-[4px] font-sans text-[12px] p-[1px] pl-1 pr-1 hover:opacity-70"
              >
                {e}
              </Link>
            </Box>
          ))}
    </Box>
  )
}
