import React from "react"
import { IArticle } from "entities/article/types/types"
import { nanoid } from "nanoid"
import { Box, useMediaQuery } from "@mui/material"
import { Link } from "react-router-dom"
import clsx from "clsx"

export const Tags: React.FC<Pick<IArticle, "tagList">> = ({ tagList }) => {
  const regex = /[a-zабвгдеёжзийклмнопрстуфхцчшщъыьэюя0-9]/i
  const isHoverSupported = useMediaQuery("(hover: hover) and (pointer: fine)")
  return (
    <Box className="flex gap-1 max-w-[100%]">
      {tagList &&
        tagList
          .slice(0, 3)
          .filter((e) => regex.test(e))
          .map((e) => (
            <Box sx={{ color: "text.primary", borderColor: "secondary.main", maxWidth: "25%" }} key={nanoid()}>
              <Link
                to={`/articles/tag/${e}`}
                className={clsx(
                  "border rounded-[4px] font-sans text-[10px] p-[1px] pl-1 pr-1 max-w-[100%] whitespace-nowrap",
                  isHoverSupported && "hover:opacity-70",
                  "inline-block overflow-hidden text-ellipsis"
                )}
              >
                {e}
              </Link>
            </Box>
          ))}
    </Box>
  )
}
